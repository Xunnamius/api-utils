/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { sendHttpBadContentType, sendHttpBadRequest } from '@-xun/respond';
import { toss } from 'toss-expression';

import { globalDebugLogger } from 'universe+api:constant.ts';
import { ErrorMessage } from 'universe+api:error.ts';

import type { ValidHttpMethod } from '@-xun/types';
import type { EmptyObject } from 'type-fest';

import type {
  LegacyMiddlewareContext,
  MiddlewareContext,
  ModernMiddlewareContext,
  NextApiRequestLike,
  NextApiResponseLike
} from 'universe+api';

import type { AnyMiddleware } from 'universe+api:types.ts';

const debug = globalDebugLogger.extend('check-content-type');
const payloadMethods = ['PUT', 'POST', 'PATCH'];

/**
 * The shape of a simple configuration object.
 */
export type AllowedContentTypesConfig = string[] | 'any' | 'none';

/**
 * The shape of a complex configuration object.
 */
export type AllowedContentTypesPerMethodConfig = {
  [method in ValidHttpMethod]?: AllowedContentTypesConfig;
};

export type Options = {
  /**
   * A string, a mapping, or an array of media types this endpoint is
   * allowed to receive.
   *
   * If the string `"any"` is provided, any Content-Type header will be allowed,
   * including requests without a Content-Type header.
   *
   * If the string `"none"` is provided, only requests without a Content-Type
   * header will be allowed. Similarly, `"none"` can also be included in the
   * array form to indicate that requests without a Content-Type header are
   * allowed in addition to those with a listed media type.
   *
   * If a plain object is provided, it is assumed to be a mapping of HTTP method
   * keys and media type values where each value is one of the string `"any"` or
   * `"none"` or an array of media types / `"none"`s. In this form, these
   * constraints are applied per request method.
   *
   * By default, _all_ requests using `POST`, `PUT`, and `PATCH` methods, or any
   * request _with_ a Content-Type header, _will always be rejected_ unless
   * configured otherwise. Requests _without_ a Content-Type header that are
   * using methods other than `POST`, `PUT`, and `PATCH` _will always be
   * allowed_ unless explicitly configured via mapping.
   *
   * @see https://www.iana.org/assignments/media-types/media-types.xhtml
   */
  allowedContentTypes?: AllowedContentTypesConfig | AllowedContentTypesPerMethodConfig;
};

export type Context = EmptyObject;

/**
 * Rejects requests that are not using an allowed content type. This middleware
 * should usually come _after_ check-method.
 */
export default async function middleware<
  RequestType extends Request,
  ResponseType extends Response
>(
  request: RequestType,
  context: ModernMiddlewareContext<Options, Context>
): Promise<ResponseType | undefined>;
export default async function middleware<
  RequestType extends NextApiRequestLike,
  ResponseType extends NextApiResponseLike
>(
  req: RequestType,
  res: ResponseType,
  context: LegacyMiddlewareContext<Options, Context>
): Promise<void>;
export default async function middleware(
  reqOrRequest: NextApiRequestLike | Request,
  resOrContext: NextApiResponseLike | ModernMiddlewareContext<Options, Context>,
  maybeContext?: LegacyMiddlewareContext<Options, Context>
): Promise<Response | undefined | void> {
  const isInLegacyMode = !!maybeContext;
  debug('entered middleware runtime (mode: %O)', isInLegacyMode ? 'LEGACY' : 'MODERN');

  const context = (isInLegacyMode ? resOrContext : maybeContext) as MiddlewareContext<
    Options,
    Context,
    AnyMiddleware<Options, Context>
  >;

  const { allowedContentTypes: rawAllowedContentTypes } = context.options;

  const method = reqOrRequest.method?.toUpperCase();
  const contentType = isInLegacyMode
    ? (reqOrRequest as NextApiRequestLike).headers['content-type']
    : (reqOrRequest as Request).headers.get('content-type');

  const configToLowercase = function (
    allowedContentTypesConfig: AllowedContentTypesConfig
  ): AllowedContentTypesConfig {
    return typeof allowedContentTypesConfig === 'string'
      ? (allowedContentTypesConfig.toLowerCase() as typeof allowedContentTypesConfig)
      : Array.isArray(allowedContentTypesConfig)
        ? allowedContentTypesConfig.map((s) => s.toLowerCase())
        : toss(new Error(ErrorMessage.InvalidAllowedContentTypes()));
  };

  // ? Ensure everything is lowercased before we begin
  const allowed = parseRawAllowedContentTypes();

  if (!method) {
    debug('content-type check failed: method is undefined');

    if (isInLegacyMode) {
      const res = resOrContext as NextApiResponseLike;
      sendHttpBadRequest(res, { error: ErrorMessage.MethodIsUndefined() });
    } else {
      return sendHttpBadRequest({ error: ErrorMessage.MethodIsUndefined() });
    }
  } else {
    const isPayloadMethod = payloadMethods.includes(method);

    if (!allowed) {
      if (isPayloadMethod || contentType) {
        debug(
          'content-type check failed: this request cannot be handled with the current configuration'
        );

        if (isInLegacyMode) {
          const res = resOrContext as NextApiResponseLike;
          sendHttpBadContentType(res, {
            error: ErrorMessage.CannotHandleContentType()
          });
        } else {
          return sendHttpBadContentType({
            error: ErrorMessage.CannotHandleContentType()
          });
        }
      }
    } else {
      if (allowed === 'none') {
        if (contentType) {
          return sendOrReturnContentTypeErrorResponse();
        }
      } else if (allowed !== 'any') {
        if (Array.isArray(allowed)) {
          if (isPayloadMethod || contentType) {
            const allowsNone = allowed.includes('none');
            if (!contentType) {
              if (!allowsNone) {
                return sendOrReturnContentTypeErrorResponse();
              }
            } else if (contentType === 'none' || !allowed.includes(contentType)) {
              return sendOrReturnContentTypeErrorResponse();
            }
          }
        } else {
          if (Object.keys(allowed).includes(method)) {
            const allowedSubset = allowed[method as ValidHttpMethod];

            if (allowedSubset === 'none') {
              if (contentType) {
                return sendOrReturnContentTypeErrorResponse();
              }
            } else if (allowedSubset && allowedSubset !== 'any') {
              const allowsNone = allowedSubset.includes('none');
              if (!contentType) {
                if (!allowsNone) {
                  return sendOrReturnContentTypeErrorResponse();
                }
              } else if (
                contentType === 'none' ||
                !allowedSubset.includes(contentType)
              ) {
                return sendOrReturnContentTypeErrorResponse();
              }
            }
          } else if (isPayloadMethod || contentType) {
            return sendOrReturnContentTypeErrorResponse();
          }
        }
      }

      debug('content-type check succeeded: type %O is allowed', contentType);
    }
  }

  function parseRawAllowedContentTypes() {
    if (rawAllowedContentTypes) {
      if (
        Array.isArray(rawAllowedContentTypes) ||
        typeof rawAllowedContentTypes === 'string'
      ) {
        return configToLowercase(rawAllowedContentTypes);
      } else {
        for (const [subMethod, config] of Object.entries(rawAllowedContentTypes)) {
          rawAllowedContentTypes[subMethod as ValidHttpMethod] =
            configToLowercase(config);
        }

        return rawAllowedContentTypes;
      }
    }
  }

  function sendOrReturnContentTypeErrorResponse() {
    const error = ErrorMessage.BadContentType(contentType, method);
    debug(`content-type check failed: ${error}`);

    if (isInLegacyMode) {
      const res = resOrContext as NextApiResponseLike;
      sendHttpBadContentType(res, { error });
    } else {
      return sendHttpBadContentType({ error });
    }
  }
}
