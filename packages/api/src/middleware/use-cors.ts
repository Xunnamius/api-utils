import vary from 'vary';

import { globalDebugLogger } from 'universe+api:constant.ts';

import type { ServerResponse } from 'node:http';
import type { EmptyObject } from 'type-fest';

import type {
  MiddlewareContext,
  ModernMiddlewareContext,
  NextApiRequestLike,
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
   * @default ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT']
   * @see {@link defaultAllowedCorsMethods}
   */
  allowedMethods?: CheckMethodOptions['allowedMethods'];
};

export type Context = EmptyObject;

/**
 * @see {@link Options}
 */
export const defaultAllowedCorsMethods = [
  'DELETE',
  'GET',
  'HEAD',
  'PATCH',
  'POST',
  'PUT'
];

/**
 * Allows _cross-origin_ requests. Note that this can be dangerous (huge
 * security hole) and should only be used for public APIs.
 *
 * When present, this should be among if not the **very first** middleware in
 * the use chain!
 *
 * **NOTE: this middleware is not needed if using a framework like Next.js (App
 * Router) that handles CORS headers for you.**
 *
 * @see {@link defaultAllowedCorsMethods}
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
        const req = reqOrRequest as NextApiRequestLike;
        const res = resOrModernContext as NextApiResponseLike;
        const rawHeaders = Object.entries(res.getHeaders()).map(
          /* istanbul ignore next */
          ([k, v]) => [k, v?.toString() || ''] as [string, string]
        );

        res.statusCode = 204;
        res.setHeader('Content-Length', '0');

        res.setHeaders(
          getPreflightResponseHeaders(
            new Headers(rawHeaders),
            allowedMethods,
            // TODO: maybe provide allowed headers instead of reflecting request
            req.headers['access-control-request-headers']
          )
        );

        handleVaryHeader();
        res.end();
      } else {
        const request = reqOrRequest as Request;
        const context = resOrModernContext as ModernMiddlewareContext<Options, Context>;

        const {
          runtime: { response }
        } = context;

        // @ts-expect-error: using escape hatch to "dangerously" reset response
        context.runtime.response = null;

        const outgoingResponse = new Response(null, {
          status: 204,
          headers: getPreflightResponseHeaders(
            response.headers,
            allowedMethods,
            // TODO: maybe provide allowed headers instead of reflecting request
            request.headers.get('Access-Control-Request-Headers')
          )
        });

        handleVaryHeader(outgoingResponse);
        return outgoingResponse;
      }
    } else {
      if (isInLegacyMode) {
        const res = resOrModernContext as NextApiResponseLike;
        res.setHeaders(getStandardResponseHeaders());
      } else {
        const context = resOrModernContext as ModernMiddlewareContext<Options, Context>;
        context.runtime.doAfterHandled((_request, { runtime: { response } }) => {
          getStandardResponseHeaders().forEach((value, key) =>
            response.headers.set(key, value)
          );
        });
      }

      handleVaryHeader();
    }

    function handleVaryHeader(overrideResponse?: Response) {
      if (isInLegacyMode) {
        const res = resOrModernContext as NextApiResponseLike;
        res.setHeaders(getStandardResponseHeaders());

        const varyHeader = res.getHeader('Vary');

        if (varyHeader) {
          vary(res, varyHeader.toString());
        }
      } else {
        const {
          runtime: { response }
        } = overrideResponse
          ? { runtime: { response: overrideResponse } }
          : (resOrModernContext as ModernMiddlewareContext<Options, Context>);

        const varyHeader = response.headers.get('Vary');

        if (varyHeader) {
          const resAdapter = {
            getHeader(name) {
              /* istanbul ignore next */
              return response.headers.get(name) ?? undefined;
            },
            setHeader(name, value) {
              response.headers.set(name, value.toString());
              return resAdapter;
            }
          } as ServerResponse;

          vary(resAdapter, varyHeader.toString());
        }
      }
    }

    /**
     * @see https://www.npmjs.com/package/cors?activeTab=code
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
     */
    function getStandardResponseHeaders() {
      const headers = new Headers({
        'Access-Control-Allow-Origin': '*'
        // Access-Control-Allow-Credentials
        // Access-Control-Expose-Headers
      });

      // If Access-Control-Allow-Origin is ever not "*"...
      //headers.append('Vary', 'Origin');
      return headers;
    }

    /**
     * @see https://www.npmjs.com/package/cors?activeTab=code
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
     */
    function getPreflightResponseHeaders(
      responseHeaders: Headers,
      allowedMethods: Options['allowedMethods'],
      acRequestHeaders: string | null | undefined
    ) {
      // Access-Control-Allow-Origin
      // Access-Control-Allow-Credentials
      // Access-Control-Expose-Headers
      getStandardResponseHeaders().forEach((value, key) =>
        responseHeaders.set(key, value)
      );

      // Access-Control-Allow-Methods
      responseHeaders.set(
        'Access-Control-Allow-Methods',
        (allowedMethods || defaultAllowedCorsMethods)
          .filter((m) => m !== 'OPTIONS')
          .join(',')
      );

      // Access-Control-Allow-Headers

      responseHeaders.append('Vary', 'Access-Control-Request-Headers');

      if (acRequestHeaders) {
        responseHeaders.set('Access-Control-Allow-Headers', acRequestHeaders);
      }

      // Access-Control-Max-Age

      return responseHeaders;
    }
  } satisfies ExportedMiddleware<Options, Context>;
}
