/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  ApiError,
  AuthError,
  ClientValidationError,
  ForbiddenError,
  NotFoundError,
  NotImplementedError,
  SanityError,
  ServerValidationError
} from '@-xun/api-strategy/error';

import {
  sendHttpBadRequest,
  sendHttpNotFound,
  sendHttpUnauthenticated,
  sendHttpUnauthorized,
  sendHttpUnspecifiedError,
  sendNotImplemented
} from '@-xun/respond';

import { globalDebugLogger } from 'universe+api:constant.ts';
import { ErrorMessage } from 'universe+api:error.ts';

import type { JsonError } from '@-xun/respond';
import type { EmptyObject, JsonObject, Promisable } from 'type-fest';

import type {
  MiddlewareContext,
  NextApiRequestLike,
  NextApiResponseLike
} from 'universe+api';

import type {
  ExportedMiddleware,
  LegacyMiddlewareContext,
  ModernMiddlewareContext,
  ModernOrLegacyMiddleware
} from 'universe+api:types.ts';

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
export type ModernErrorHandler<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
> = (
  request: Request,
  response: Response,
  errorJson: Partial<JsonError>,
  middlewareContext: ModernMiddlewareContext<Options, Heap>
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
export type LegacyErrorHandler<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
> = (
  req: NextApiRequestLike,
  res: NextApiResponseLike,
  errorJson: Partial<JsonError>,
  middlewareContext: LegacyMiddlewareContext<Options, Heap>
) => Promisable<Error | void>;

/**
 * A Map of Error class constructors to the special middleware that handles
 * them.
 */
export type ErrorHandlerMap<
  ErrorHandler extends
    | ModernErrorHandler<never, never>
    | LegacyErrorHandler<never, never>
> = Map<new (...args: never[]) => Error, ErrorHandler>;

export type Options<
  ErrorHandler extends
    | ModernErrorHandler<never, never>
    | LegacyErrorHandler<never, never>
> = {
  /**
   * A mapping of Error classes and the functions that handle them.
   */
  errorHandlers?: ErrorHandlerMap<ErrorHandler>;
};

export type Context = EmptyObject;

/**
 * Returns a generic error handling middleware.
 *
 * **NOTE: said middleware should usually be the very last middleware to run on
 * the error handling middleware chain.**
 */
export function makeMiddleware() {
  return async function (reqOrRequest, resOrModernContext, maybeLegacyContext) {
    const isInLegacyMode = !!maybeLegacyContext;
    debug('entered middleware runtime (mode: %O)', isInLegacyMode ? 'LEGACY' : 'MODERN');

    const context = (
      isInLegacyMode ? maybeLegacyContext : resOrModernContext
    ) as MiddlewareContext<
      Options<ModernErrorHandler<never, never> | LegacyErrorHandler<never, never>>,
      Context,
      ModernOrLegacyMiddleware<
        Options<ModernErrorHandler<never, never> | LegacyErrorHandler<never, never>>,
        Context
      >
    >;

    const {
      runtime: { error },
      options: { errorHandlers }
    } = context;

    debug('handling error: %O', error);

    if (isInLegacyMode && (resOrModernContext as NextApiResponseLike).writableEnded) {
      // ? We're past the point where we're able to change the response.
      debug('cannot handle error: response is no longer writable');
      debug('throwing unhandleable error');
      throw error;
    }

    const resOrResponse = isInLegacyMode
      ? (resOrModernContext as NextApiResponseLike)
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
            const result = await Reflect.apply(errorHandler, null, [
              reqOrRequest,
              resOrResponse,
              errorJson,
              context
            ] as Parameters<typeof errorHandler>);

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
        handleAs instanceof Error ? ` for type "${handleAs.constructor.name}"` : ''
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
      return respondWith(sendHttpUnauthenticated, errorJson);
    } else if (handleAs instanceof ForbiddenError) {
      return respondWith(sendHttpUnauthorized, errorJson);
    } else if (handleAs instanceof NotFoundError) {
      return respondWith(sendHttpNotFound, errorJson);
    } else if (handleAs instanceof NotImplementedError) {
      return respondWith(sendNotImplemented, {});
    } else if (handleAs instanceof ApiError) {
      // eslint-disable-next-line no-console
      console.error(`named exception on request: ${url}\n`, error);
      return respondWith(sendHttpUnspecifiedError, errorJson);
    } else {
      // eslint-disable-next-line no-console
      console.error(`unnamed exception on request: ${url}\n`, error);
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
        sender(resOrModernContext as NextApiResponseLike, errorJson as JsonObject);
      } else {
        return sender(errorJson as JsonObject);
      }
    }
  } satisfies ExportedMiddleware<
    Options<ModernErrorHandler<never, never> | LegacyErrorHandler<never, never>>,
    Context
  >;
}
