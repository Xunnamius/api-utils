/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import {
  ApiError,
  AuthError,
  ClientValidationError,
  NotFoundError,
  NotImplementedError,
  SanityError,
  ServerValidationError
} from '@-xun/api-strategy/error';

import {
  sendHttpBadRequest,
  sendHttpNotFound,
  sendHttpUnauthorized,
  sendHttpUnspecifiedError,
  sendNotImplemented
} from '@-xun/respond';

import { globalDebugLogger } from 'universe+api:constant.ts';
import { ErrorMessage } from 'universe+api:error.ts';

import type { JsonError } from '@-xun/respond';
import type { EmptyObject, JsonObject, Promisable } from 'type-fest';

import type {
  LegacyMiddlewareContext,
  MiddlewareContext,
  ModernMiddlewareContext,
  NextApiRequestLike,
  NextApiResponseLike
} from 'universe+api';

import type { AnyMiddleware } from 'universe+api:types.ts';

const debug = globalDebugLogger.extend('handle-error');

type ErrorLikeOrUndefined = { message: string } | undefined;

/**
 * Special middleware used to handle custom errors.
 *
 * If you want to handle the custom error as if it were one of the well-known
 * error classes from `@-xun/api-strategy/error`, return said class from this
 * function.
 *
 * Errors thrown from within this function are ignored.
 *
 * @see {@link middleware}
 */
export type ModernErrorHandler = (
  request: Request,
  response: Response,
  errorJson: Partial<JsonError>
) => Promisable<Error | Response | undefined | void>;

/**
 * Special middleware used to handle custom errors.
 *
 * If you want to handle the custom error as if it were one of the well-known
 * error classes from `@-xun/api-strategy/error`, return said class from this
 * function.
 *
 * Errors thrown from within this function are ignored.
 *
 * @see {@link middleware}
 */
export type LegacyErrorHandler = (
  req: NextApiRequestLike,
  res: NextApiResponseLike,
  errorJson: Partial<JsonError>
) => Promisable<Error | void>;

/**
 * A Map of Error class constructors to the special middleware that handles
 * them.
 */

export type ErrorHandlerMap<
  ErrorHandler extends ModernErrorHandler | LegacyErrorHandler
> = Map<new (...args: any[]) => Error, ErrorHandler>;

export type Options<ErrorHandler extends ModernErrorHandler | LegacyErrorHandler> = {
  /**
   * A mapping of Error classes and the functions that handle them.
   */
  errorHandlers?: ErrorHandlerMap<ErrorHandler>;
};

export type Context = EmptyObject;

/**
 * Generic error handling middleware. **This should usually be the very last
 * middleware to run on the error handling middleware chain.**
 */
export default async function middleware<
  RequestType extends Request,
  ResponseType extends Response
>(
  request: RequestType,
  context: ModernMiddlewareContext<Options<ModernErrorHandler>, Context>
): Promise<ResponseType | undefined>;
export default async function middleware<
  RequestType extends NextApiRequestLike,
  ResponseType extends NextApiResponseLike
>(
  req: RequestType,
  res: ResponseType,
  context: LegacyMiddlewareContext<Options<LegacyErrorHandler>, Context>
): Promise<void>;
export default async function middleware(
  reqOrRequest: NextApiRequestLike | Request,
  resOrContext:
    | NextApiResponseLike
    | ModernMiddlewareContext<Options<ModernErrorHandler>, Context>,
  maybeContext?: LegacyMiddlewareContext<Options<LegacyErrorHandler>, Context>
): Promise<Response | undefined | void> {
  const isInLegacyMode = !!maybeContext;
  debug('entered middleware runtime (mode: %O)', isInLegacyMode ? 'LEGACY' : 'MODERN');

  const context = (isInLegacyMode ? resOrContext : maybeContext) as MiddlewareContext<
    Options<ModernErrorHandler | LegacyErrorHandler>,
    Context,
    AnyMiddleware<Options<ModernErrorHandler | LegacyErrorHandler>, Context>
  >;

  const {
    runtime: { error },
    options: { errorHandlers }
  } = context;

  debug('handling error: %O', error);

  if (isInLegacyMode && (resOrContext as NextApiResponseLike).writableEnded) {
    // ? We're past the point where we're able to change the response.
    debug('cannot handle error: response is no longer writable');
    debug('throwing unhandleable error');
    throw error;
  }

  const resOrResponse = isInLegacyMode
    ? (resOrContext as NextApiResponseLike)
    : context.runtime.response || new Response();

  const errorJson: Partial<JsonError> = (error as ErrorLikeOrUndefined)?.message
    ? { error: (error as NonNullable<ErrorLikeOrUndefined>).message }
    : {};

  debug('handling error: %O', errorJson.error || '(no message)');

  let handlerResult = undefined as undefined | Error | Response;

  if (errorHandlers) {
    try {
      for (const [errorType, errorHandler] of errorHandlers) {
        if (error instanceof errorType) {
          debug(`using custom error handler for type "${error.name}"`);

          // eslint-disable-next-line no-await-in-loop
          const result = await errorHandler(
            reqOrRequest as Request & NextApiRequestLike,
            resOrResponse as Response & NextApiResponseLike,
            errorJson
          );

          if (!result) {
            return;
          } else {
            handlerResult = result;
          }
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'custom error handler failed with error (will be ignored): %O',
        error
      );
    }
  }

  if (handlerResult instanceof Response) {
    return handlerResult;
  }

  const handleAs = handlerResult ?? error;

  debug(
    `using default error handler${
      handleAs instanceof Error ? ` for type "${handleAs.name}"` : ''
    }`
  );

  const url = String(reqOrRequest.url);

  // ? Handle validation errors from ArkType (imported dynamically for config)
  const {
    ArkError,
    ParseError: ArkParseError,
    TraversalError: ArkTraversalError
  } = await import('arktype');

  if (handleAs instanceof SanityError) {
    // eslint-disable-next-line no-console
    console.error(`sanity check failed on request: ${url}\n`, error);
    return respondWith(sendHttpUnspecifiedError, {
      error: ErrorMessage.SanityCheckFailed()
    });
  } else if (handleAs instanceof ServerValidationError) {
    // eslint-disable-next-line no-console
    console.error(`server-side validation exception on request: ${url}\n`, error);
    return respondWith(sendHttpUnspecifiedError, errorJson);
  } else if (
    handleAs instanceof ClientValidationError ||
    handleAs instanceof ArkError ||
    handleAs instanceof ArkParseError ||
    handleAs instanceof ArkTraversalError
  ) {
    return respondWith(sendHttpBadRequest, errorJson);
  } else if (handleAs instanceof AuthError) {
    return respondWith(sendHttpUnauthorized, errorJson);
  } else if (handleAs instanceof NotFoundError) {
    return respondWith(sendHttpNotFound, errorJson);
  } else if (handleAs instanceof NotImplementedError) {
    return respondWith(sendNotImplemented, {});
  } else if (handleAs instanceof ApiError) {
    // eslint-disable-next-line no-console
    console.error(`error - named exception on request: ${url}\n`, error);
    return respondWith(sendHttpUnspecifiedError, errorJson);
  } else {
    // eslint-disable-next-line no-console
    console.error(`error - unnamed exception on request: ${url}\n`, error);
    return respondWith(sendHttpUnspecifiedError, {});
  }

  function respondWith(
    sender:
      | typeof sendHttpUnspecifiedError
      | typeof sendHttpBadRequest
      | typeof sendHttpUnauthorized
      | typeof sendNotImplemented
      | typeof sendHttpNotFound,
    errorJson: Partial<JsonError>
  ) {
    if (isInLegacyMode) {
      sender(resOrContext as NextApiResponseLike, errorJson as JsonObject);
    } else {
      return sender(errorJson as JsonObject);
    }
  }
}
