import querystring from 'node:querystring';
import { isNativeError } from 'node:util/types';

import { sendHttpTooLarge } from '@-xun/respond';
import { parse } from 'content-type';
import getRawBody from 'raw-body';

import { isNextApiRequestLike, isNextApiResponseLike } from 'universe+api';
import { globalDebugLogger } from 'universe+api:constant.ts';
import { ErrorMessage } from 'universe+api:error.ts';

import type { RawBodyError } from 'raw-body';
import type { ExportedMiddleware } from 'universe+api:types.ts';

const debug = globalDebugLogger.extend('add-raw-body');

// * https://xunn.at/source-nextjs-defaultbodylimit
const defaultRequestBodySizeLimit = '1mb';

const isRawBodyError = (error: unknown): error is RawBodyError => {
  return isNativeError(error) && typeof (error as RawBodyError).type === 'string';
};

export type Options = {
  /**
   * The byte limit of the request body. This is the number of bytes or any
   * string format supported by bytes, for example `1000`, `'500kb'` or `'3mb'`.
   *
   * @default defaultRequestBodySizeLimit (see source)
   *
   * @see https://nextjs.org/docs/api-routes/api-middlewares#custom-config
   */
  requestBodySizeLimit?: number | string | null;
};

export type Context = {
  /**
   * The raw request body exactly as it was received (i.e. as a string parsed by
   * `raw-body`).
   */
  rawBody: string;
};

/**
 * Adds a `rawBody` property into the heap, making it available to all other
 * middleware and handlers.
 *
 * `rawBody` contains the raw unparsed content of the request body if it exists
 * or `undefined` if it does not. `req.body` is still parsed like normal using a
 * custom implementation of Next.js's body parser.
 *
 * To use this middleware, Next.js's body parser must be disabled via route
 * configuration like so:
 *
 * ```TypeScript
 * export const config = {
 *   api: {
 *     bodyParser: false
 *   },
 * }
 * ```
 *
 * Note that this middleware is only for legacy applications that are relying on
 * `IncomingMessage` and `NextApiRequestLike` instead of a more modern
 * {@link Request}-based approach. Additionally, this middleware cannot be used
 * with other middleware or routes that also directly consume the request body
 * in a special way, such as when using streams.
 *
 * @see https://nextjs.org/docs/api-routes/api-middlewares#custom-config
 */
export function makeMiddleware() {
  return async function (reqOrRequest, resOrModernContext, maybeLegacyContext) {
    debug('entered middleware runtime (mode: %O)', 'LEGACY-ONLY');

    if (
      !isNextApiRequestLike(reqOrRequest) ||
      !isNextApiResponseLike(resOrModernContext) ||
      !maybeLegacyContext
    ) {
      throw new TypeError(ErrorMessage.ModernMiddlewareApiNotSupported());
    }

    const req = reqOrRequest;
    const res = resOrModernContext;
    const context = maybeLegacyContext;

    if (req.body !== undefined) {
      throw new Error(ErrorMessage.MustDisableBodyParser());
    }

    // * The below code was adapted from https://xunn.at/source-nextjs-parsebody

    let contentType;

    try {
      contentType = parse(req.headers['content-type'] || 'text/plain');
    } catch {
      contentType = parse('text/plain');
    }

    const { type, parameters } = contentType;
    const encoding = parameters.charset || 'utf8';
    const limit = context.options.requestBodySizeLimit || defaultRequestBodySizeLimit;

    let buffer;

    try {
      buffer = (await getRawBody(req, { encoding, limit })).toString();
    } catch (error) {
      if (isRawBodyError(error) && error.type === 'entity.too.large') {
        sendHttpTooLarge(res, { error: `body exceeded ${limit} size limit` });
      } else {
        throw new Error('invalid body');
      }
    }

    if (buffer !== undefined) {
      debug('adding existing raw body to heap');
      context.heap.rawBody = buffer;

      if (type === 'application/json' || type === 'application/ld+json') {
        debug('performing secondary parsing of body as JSON data');
        if (context.heap.rawBody.length === 0) {
          // special-case empty json body, as it's a common client-side mistake
          req.body = {};
        } else {
          try {
            req.body = JSON.parse(context.heap.rawBody);
          } catch {
            throw new Error('invalid JSON body');
          }
        }
      } else if (type === 'application/x-www-form-urlencoded') {
        debug('performing secondary parsing of body as urlencoded form data');
        req.body = querystring.decode(context.heap.rawBody);
      } else {
        debug('no secondary parsing of body (passthrough)');
        req.body = context.heap.rawBody;
      }
    }
  } satisfies ExportedMiddleware<Options, Context>;
}
