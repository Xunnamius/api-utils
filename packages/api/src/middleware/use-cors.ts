import vary from 'vary';

import { globalDebugLogger } from 'universe+api:constant.ts';

import type { ServerResponse } from 'node:http';
import type { EmptyObject } from 'type-fest';

import type {
  MiddlewareContext,
  ModernMiddlewareContext,
  NextApiResponseLike
} from 'universe+api';

import type { Options as CheckMethodOptions } from 'universe+api:middleware/check-method.ts';

import type {
  ExportedMiddleware,
  ModernOrLegacyMiddleware
} from 'universe+api:types.ts';

const debug = globalDebugLogger.extend('use-cors');

export type Options = {
  /**
   * @default ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
   */
  allowedMethods?: CheckMethodOptions['allowedMethods'];
};

export type Context = EmptyObject;

/**
 * Allows _cross-origin_ requests for the most popular request types. **Note
 * that this can be dangerous (huge security hole) and should only be used for
 * public APIs**.
 *
 * When present, this should be among the very first middleware in the
 * before-handler use chain (certainly before the `check-method` middleware).
 *
 * By default, allowed CORS methods are: `GET`, `HEAD`, `PUT`, `PATCH`, `POST`,
 * and `DELETE`.
 */
export function makeMiddleware() {
  return async function (reqOrRequest, resOrModernContext, maybeLegacyContext) {
    const isInLegacyMode = !!maybeLegacyContext;
    debug('entered middleware runtime (mode: %O)', isInLegacyMode ? 'LEGACY' : 'MODERN');

    const method = reqOrRequest.method?.toUpperCase();

    if (method === 'OPTIONS') {
      const {
        options: { allowedMethods }
      } = (
        isInLegacyMode ? maybeLegacyContext : resOrModernContext
      ) as MiddlewareContext<
        Options,
        Context,
        ModernOrLegacyMiddleware<Options, Context>
      >;

      if (isInLegacyMode) {
        const res = resOrModernContext as NextApiResponseLike;
        const rawHeaders = Object.entries(res.getHeaders()).map(
          ([k, v]) => [k, v?.toString() || ''] as [string, string]
        );

        res.statusCode = 200; //204
        res.setHeaders(getPreflightHeaders(new Headers(rawHeaders), allowedMethods));
      } else {
        const {
          runtime: { response }
        } = resOrModernContext as ModernMiddlewareContext<Options, Context>;

        return new Response('OK', {
          status: 200, //204
          headers: getPreflightHeaders(response.headers, allowedMethods)
        });
      }
    } else {
      if (isInLegacyMode) {
        maybeLegacyContext.runtime.doAfterHandled((_req, res) => {
          res.setHeaders(getStandardHeaders());

          const varyHeader = res.getHeader('Vary');

          if (varyHeader) {
            vary(res, varyHeader.toString());
          }
        });
      } else {
        const context = resOrModernContext as ModernMiddlewareContext<Options, Context>;
        context.runtime.doAfterHandled((_request, { runtime: { response } }) => {
          getStandardHeaders().forEach((value, key) => response.headers.set(key, value));

          const varyHeader = response.headers.get('Vary');

          if (varyHeader) {
            const resAdapter = {
              getHeader(name) {
                return response.headers.get(name) ?? undefined;
              },
              setHeader(name, value) {
                response.headers.set(name, value.toString());
                return resAdapter;
              }
            } as ServerResponse;

            vary(resAdapter, varyHeader.toString());
          }
        });
      }
    }

    /**
     * @see https://www.npmjs.com/package/cors?activeTab=code
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
     */
    function getStandardHeaders() {
      return new Headers({
        'Access-Control-Allow-Origin': '*'
        // Access-Control-Allow-Credentials
        // Access-Control-Expose-Headers
      });
    }

    /**
     * @see https://www.npmjs.com/package/cors?activeTab=code
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
     */
    function getPreflightHeaders(
      incomingHeaders: Headers,
      allowedMethods: Options['allowedMethods']
    ) {
      // Access-Control-Allow-Origin
      // Access-Control-Allow-Credentials
      // Access-Control-Expose-Headers
      getStandardHeaders().forEach((value, key) => incomingHeaders.set(key, value));

      // Access-Control-Allow-Methods
      incomingHeaders.set(
        'Access-Control-Allow-Methods',
        allowedMethods?.toString() || 'GET,HEAD,PUT,PATCH,POST,DELETE'
      );

      // Access-Control-Allow-Headers

      incomingHeaders.append('Vary', 'Access-Control-Request-Headers');

      const acRequestHeaders = incomingHeaders.get('Access-Control-Request-Headers');

      if (acRequestHeaders) {
        incomingHeaders.set(
          'Access-Control-Allow-Headers',
          // TODO: provide allowed headers instead of reflecting request's
          acRequestHeaders
        );
      }

      // Access-Control-Max-Age

      return incomingHeaders;
    }
  } satisfies ExportedMiddleware<Options, Context>;
}
