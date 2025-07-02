/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { sendHttpUnspecifiedError, sendNotImplemented } from '@-xun/respond';
import { toss } from 'toss-expression';

import { globalDebugLogger as debug } from 'universe+api:constant.ts';
import { ErrorMessage } from 'universe+api:error.ts';

import type { ExtendedDebugger } from 'rejoinder';
import type { UnextendableInternalLogger } from 'rejoinder/internal';
import type { UnwrapTagged, Writable } from 'type-fest';

import type {
  NextApiRequestLike,
  NextApiResponseLike
} from 'multiverse+shared:next-like.ts';

import type {
  AnyMiddleware,
  GenericLegacyMiddleware,
  GenericModernMiddleware,
  LegacyApiHandler,
  LegacyMiddleware,
  MiddlewareContext,
  MiddlewareFactorySignatureLegacy,
  MiddlewareFactorySignatureModern,
  ModernApiHandler,
  ModernMiddleware,
  PickFactoriedOptions,
  WithMiddlewareOptions,
  WithMiddlewareSignatureLegacy,
  WithMiddlewareSignatureModern
} from 'universe+api:types.ts';

export {
  getAuthorizationHeaderFromRequestLike,
  isNextApiRequestLike,
  isNextApiResponseLike
} from 'multiverse+shared:next-like.ts';

export type {
  NextApiRequestLike,
  NextApiResponseLike
} from 'multiverse+shared:next-like.ts';

export type {
  GenericLegacyApiHandler,
  GenericLegacyMiddleware,
  GenericModernApiHandler,
  GenericModernMiddleware,
  LegacyApiHandler,
  LegacyBasicApiHandler,
  LegacyMiddleware,
  LegacyMiddlewareContext,
  MiddlewareContext,
  ModernApiHandler,
  ModernBasicApiHandler,
  ModernMiddleware,
  ModernMiddlewareContext
} from 'universe+api:types.ts';

/**
 * This function decorates a {@link Request} handler, returning a generic
 * {@link Response}-returning middleware runner function compatible with tools
 * like Cloudflare Workers.
 *
 * The returned function additionally exposes HTTP method properties (e.g.
 * `GET`, `POST`) compatible with the Next.js App Router.
 *
 * Passing `undefined` as `handler`, or not returning a {@link Response} from
 * your handler/middleware, will trigger an `HTTP 501 Not Implemented` response.
 * This can be used to to stub out endpoints and their middleware for later
 * implementation.
 */
export function withMiddleware<
  Options extends Record<string, unknown> = Record<string, unknown>,
  RequestType extends Request = Request,
  ResponseType extends Response = Response,
  Heap extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
>(
  ...args: Parameters<
    WithMiddlewareSignatureModern<Options, RequestType, ResponseType, Heap>
  >
): ReturnType<WithMiddlewareSignatureModern<Options, RequestType, ResponseType, Heap>>;
/**
 * This function decorates a {@link LegacyApiHandler}, returning a
 * middleware runner compatible with legacy middleware like Express or the
 * Next.js Pages router.
 *
 * Passing `undefined` as `handler`, or not calling `res.end()` (and not sending
 * headers) from your handler nor middleware, will trigger an `HTTP 501 Not
 * Implemented` response. This can be used to to stub out endpoints and their
 * middleware for later implementation.
 */
export function withMiddleware<
  Options extends Record<string, unknown> = Record<string, unknown>,
  RequestType extends NextApiRequestLike = NextApiRequestLike,
  ResponseType extends NextApiResponseLike = NextApiResponseLike,
  Heap extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
>(
  ...args: Parameters<
    WithMiddlewareSignatureLegacy<Options, RequestType, ResponseType, Heap>
  >
): ReturnType<WithMiddlewareSignatureLegacy<Options, RequestType, ResponseType, Heap>>;
export function withMiddleware<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
>(
  handler:
    | ModernApiHandler<Request, Response, Heap>
    | LegacyApiHandler<NextApiRequestLike, NextApiResponseLike, Heap>
    | undefined,
  {
    descriptor,
    use,
    useOnError,
    options
  }:
    | WithMiddlewareOptions<
        Options,
        Heap,
        ModernMiddleware<Options, Request, Response, Heap>
      >
    | WithMiddlewareOptions<
        Options,
        Heap,
        LegacyMiddleware<Options, NextApiRequestLike, NextApiResponseLike, Heap>
      >
) {
  return async function (
    reqOrRequest: NextApiRequestLike | Request,
    resOrUndefined: NextApiResponseLike | Response
  ) {
    const isInLegacyMode = !!options?.legacyMode;

    debug('-- begin (%O mode) --', isInLegacyMode ? 'LEGACY' : 'MODERN');

    const doMiddlewareAfterHandled = [] as AnyMiddleware<Options, Heap>[];
    const doMiddlewareAfterSent = [] as AnyMiddleware<Options, Heap>[];
    let $response_ = new Response();

    const middlewareContext: MiddlewareContext<
      Options,
      Heap,
      AnyMiddleware<Options, Heap>
    > & { runtime: { response: Response } } = {
      runtime: {
        endpoint: {
          descriptor
        },
        done: () => toss(new Error(ErrorMessage.RuntimeDoneCalledTooEarly())),
        error: undefined,
        doAfterHandled(middleware) {
          doMiddlewareAfterHandled.push(middleware as AnyMiddleware<Options, Heap>);
        },
        doAfterSent(middleware) {
          doMiddlewareAfterSent.push(middleware as AnyMiddleware<Options, Heap>);
        },
        get response() {
          return $response_;
        },
        // ? Setting a new response must augment, not replace, the old one!
        set response(value: Response) {
          // ? Technically, value could be "void" (i.e. undefined)
          if (value instanceof Response) {
            const draftBody = value.bodyUsed ? undefined : value.body;
            const currentBody = $response_.bodyUsed ? undefined : $response_.body;
            const body = draftBody === undefined ? currentBody : draftBody;

            if (body === undefined) {
              debug.warn(
                'draft response body set to null: neither current nor updated Response has a usable body'
              );
            }

            const draftResponse = new Response(body || null, {
              status: value.status || $response_.status,
              statusText: value.statusText || $response_.statusText
            });

            $response_.headers
              .entries()
              .toArray()
              .concat(value.headers.entries().toArray())
              .forEach(([key, value]) => draftResponse.headers.set(key, value));

            $response_ = draftResponse;
          } else {
            debug.message(
              'ignored attempt to set context.runtime.response to a non-Response type'
            );
          }
        }
      },
      heap: {} as Heap,
      options: {
        callDoneOnEnd: true,
        legacyMode: isInLegacyMode,
        ...options
      } as MiddlewareContext<
        Options,
        Heap,
        GenericLegacyMiddleware & GenericModernMiddleware
      >['options']
    };

    const writableContextRuntime = middlewareContext.runtime as Writable<
      typeof middlewareContext.runtime
    >;

    try {
      let primaryChainWasAborted = false;

      try {
        debug('selecting first middleware in primary middleware chain');
        primaryChainWasAborted = await startPullingChain(use[Symbol.iterator](), debug);
      } catch (error) {
        debug('error in primary middleware chain');
        throw error;
      }

      if (typeof handler === 'function') {
        if (primaryChainWasAborted) {
          debug('not executing handler since primary chain execution was aborted');
        } else {
          debug('executing handler');

          writableContextRuntime.response = await Reflect.apply(handler, null, [
            reqOrRequest,
            isInLegacyMode ? resOrUndefined : middlewareContext.heap,
            middlewareContext.heap
          ]);

          debug('finished executing handler');
        }
      } else {
        debug('no handler function available');
        writableContextRuntime.response = sendNotImplemented();
      }

      if (isInLegacyMode) {
        const res = resOrUndefined as NextApiResponseLike;

        if (!res.writableEnded && !res.headersSent) {
          debug('response was not sent: sending "not implemented" error');
          sendNotImplemented(res);
        }
      }

      debug('-- primary use chain done --');
    } catch (error) {
      try {
        debug.error('attempting to handle error: %O', error);

        writableContextRuntime.error = error;

        if (useOnError) {
          try {
            debug.error('selecting first middleware in error handling middleware chain');
            await startPullingChain(useOnError[Symbol.iterator](), debug.error);
          } catch (subError) {
            // ? Error in error handler was unhandled
            debug.error('error in error handling middleware chain: %O', subError);
            debug.error('throwing unhandled error');
            throw subError;
          }
        } else {
          debug.error('no error handling middleware found');
          debug.error('throwing unhandled error');
          throw error;
        }

        if (isInLegacyMode) {
          const res = resOrUndefined as NextApiResponseLike;

          // ? Unhandled error, kick it up to the caller
          if (!res.writableEnded && !res.headersSent) {
            debug.error('throwing unhandled error (res not sent)');
            throw error;
          }
        } else {
          // ? Unhandled error, kick it up to the caller
          if (middlewareContext.runtime.response.status < 400) {
            debug.error('throwing unhandled error (response status < 400)');
            throw error;
          }
        }
      } finally {
        debug('-- useOnError chain done --');
      }
    }

    await runMiddlewareAfterHandled();
    const promisedMiddlewareAfterSent = runMiddlewareAfterSent();

    if (options?.awaitMiddlewareAfterSent) {
      await promisedMiddlewareAfterSent;
    }

    if (isInLegacyMode) {
      const res = resOrUndefined as NextApiResponseLike;

      if (res.writableEnded && !res.headersSent) {
        sendHttpUnspecifiedError(res);
        throw new Error(ErrorMessage.ReachedEndOfRuntime());
      }
    }

    return middlewareContext.runtime.response;

    async function runMiddlewareAfterHandled() {
      for (const middleware of doMiddlewareAfterHandled) {
        if (isInLegacyMode) {
          const typedMiddleware = middleware as LegacyMiddleware<
            Options,
            NextApiRequestLike,
            NextApiResponseLike,
            Heap
          >;

          const [req, res] = [
            reqOrRequest as NextApiRequestLike,
            resOrUndefined as NextApiResponseLike
          ];

          await typedMiddleware(
            req,
            res,
            middlewareContext as MiddlewareContext<Options, Heap, typeof typedMiddleware>
          );
        } else {
          const request = reqOrRequest as Request;
          const typedMiddleware = middleware as ModernMiddleware<
            Options,
            Request,
            Response,
            Heap
          >;

          writableContextRuntime.response =
            (await typedMiddleware(
              request,
              middlewareContext as MiddlewareContext<
                Options,
                Heap,
                typeof typedMiddleware
              >
            )) || writableContextRuntime.response;
        }
      }
    }

    async function runMiddlewareAfterSent() {
      for (const middleware of doMiddlewareAfterSent) {
        if (isInLegacyMode) {
          const typedMiddleware = middleware as LegacyMiddleware<
            Options,
            NextApiRequestLike,
            NextApiResponseLike,
            Heap
          >;

          const [req, res] = [
            reqOrRequest as NextApiRequestLike,
            resOrUndefined as NextApiResponseLike
          ];

          await typedMiddleware(
            req,
            res,
            middlewareContext as MiddlewareContext<Options, Heap, typeof typedMiddleware>
          );
        } else {
          const request = reqOrRequest as Request;
          const typedMiddleware = middleware as ModernMiddleware<
            Options,
            Request,
            Response,
            Heap
          >;

          writableContextRuntime.response =
            (await typedMiddleware(
              request,
              middlewareContext as MiddlewareContext<
                Options,
                Heap,
                typeof typedMiddleware
              >
            )) || writableContextRuntime.response;
        }
      }
    }

    /**
     * Async middleware chain iteration. Returns `true` if execution was aborted
     * or `false` otherwise.
     */
    async function startPullingChain(
      chain: IterableIterator<
        | UnwrapTagged<ModernMiddleware<Options, Request, Response, Heap>>
        | UnwrapTagged<
            LegacyMiddleware<Options, NextApiRequestLike, NextApiResponseLike, Heap>
          >
      >,
      localDebug: ExtendedDebugger | UnextendableInternalLogger
    ): Promise<boolean> {
      let executionWasAborted = false as boolean;
      let executionCompleted = false as boolean;
      let ranAtLeastOneMiddleware = false as boolean;

      try {
        if (isInLegacyMode && middlewareContext.options.callDoneOnEnd) {
          const res = resOrUndefined as NextApiResponseLike;

          localDebug(
            'chain will automatically call runtime.done after first call to res.end'
          );

          // eslint-disable-next-line @typescript-eslint/unbound-method
          const sendActual = res.end;
          res.end = ((...args: Parameters<typeof res.end>) => {
            const sent = res.writableEnded || res.headersSent;
            sendActual(...args);

            if (!sent) {
              if (!executionWasAborted && !executionCompleted) {
                localDebug('calling runtime.done after first call to res.end');
                middlewareContext.runtime.done();
              } else {
                localDebug(
                  'NOTICE: skipped calling runtime.done since chain already finished executing'
                );
              }
            }
          }) as typeof res.end;
        } else {
          localDebug('chain will NOT automatically call runtime.done');
        }

        await pullChain();

        localDebug('stopped middleware execution chain');
        localDebug(
          `at least one middleware executed: ${ranAtLeastOneMiddleware ? 'yes' : 'no'}`
        );

        return executionWasAborted;
      } catch (error) {
        executionWasAborted = true;
        debug.warn('execution chain aborted due to error');
        throw error;
      }

      async function pullChain(): Promise<void> {
        const { value: currentMiddleware, done } = chain.next();
        const writableRuntime = middlewareContext.runtime as Writable<
          typeof middlewareContext.runtime
        >;

        writableRuntime.done = () => {
          if (!executionCompleted) {
            if (!executionWasAborted) {
              localDebug('runtime.done: aborting middleware execution chain');
              executionWasAborted = true;
            } else {
              debug.warn(
                'runtime.done: chain already aborted; calling runtime.done() at this point is a noop'
              );
            }
          } else {
            debug.warn(
              'runtime.done: chain already finished executing; calling runtime.done() at this point is a noop'
            );
          }
        };

        if (!done) {
          if (typeof currentMiddleware === 'function') {
            localDebug('executing middleware');

            if (isInLegacyMode) {
              const typedCurrentMiddleware = currentMiddleware as LegacyMiddleware<
                Options,
                NextApiRequestLike,
                NextApiResponseLike,
                Heap
              >;

              const [req, res] = [
                reqOrRequest as NextApiRequestLike,
                resOrUndefined as NextApiResponseLike
              ];

              await typedCurrentMiddleware(
                req,
                res,
                middlewareContext as MiddlewareContext<
                  Options,
                  Heap,
                  typeof typedCurrentMiddleware
                >
              );
            } else {
              const request = reqOrRequest as Request;
              const typedCurrentMiddleware = currentMiddleware as ModernMiddleware<
                Options,
                Request,
                Response,
                Heap
              >;

              writableContextRuntime.response =
                (await typedCurrentMiddleware(
                  request,
                  middlewareContext as MiddlewareContext<
                    Options,
                    Heap,
                    typeof typedCurrentMiddleware
                  >
                )) || writableContextRuntime.response;
            }

            ranAtLeastOneMiddleware = true;
          } else {
            debug.warn('skipping execution of non-function item in chain');
          }

          if (executionWasAborted) {
            localDebug('execution chain aborted manually');
          } else {
            localDebug('selecting next middleware in chain');
            await pullChain();
          }

          if (!isInLegacyMode) {
            if (!executionWasAborted && !executionCompleted) {
              localDebug(
                'calling runtime.done after pullChain completed since a Response was returned'
              );

              middlewareContext.runtime.done();
            } else {
              localDebug(
                'NOTICE: skipped calling runtime.done since chain already finished executing'
              );
            }
          }
        } else {
          localDebug('no more middleware to execute');

          if (!executionCompleted) {
            localDebug(
              'deactivated runtime control functions (set executionCompleted=true)'
            );
          }

          executionCompleted = true;
        }
      }
    }
  };
}

/**
 * Returns a _modern_ {@link withMiddleware} function decorated with a "default"
 * configuration.
 *
 * The returned {@link withMiddleware} function optionally accepts its usual
 * parameters, which will be appended onto the default arguments to
 * `middlewareFactory`. Note that passed option keys will override (via shallow
 * merge) their default counterparts.
 *
 * This function is useful when you don't want to repeatedly import, configure,
 * and list a bunch of middleware every time you want to call
 * {@link withMiddleware}.
 */
export function middlewareFactory<
  Options extends Record<string, unknown> = Record<string, unknown>,
  RequestType extends Request = Request,
  ResponseType extends Response = Response,
  Heap extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
>(
  defaults: PickFactoriedOptions<
    WithMiddlewareOptions<
      Options,
      Heap,
      ModernMiddleware<Options, RequestType, ResponseType, Heap>
    >
  >
): MiddlewareFactorySignatureModern<Options, RequestType, ResponseType, Heap>;
/**
 * Returns a _legacy_ {@link withMiddleware} function decorated with a "default"
 * configuration.
 *
 * The returned {@link withMiddleware} function optionally accepts its usual
 * parameters, which will be appended onto the default arguments to
 * `middlewareFactory`. Note that passed option keys will override (via shallow
 * merge) their default counterparts.
 *
 * This function is useful when you don't want to repeatedly import, configure, and list a bunch
 * of middleware every time you want to call {@link withMiddleware}.
 */
export function middlewareFactory<
  Options extends Record<string, unknown> = Record<string, unknown>,
  RequestType extends NextApiRequestLike = NextApiRequestLike,
  ResponseType extends NextApiResponseLike = NextApiResponseLike,
  Heap extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
>(
  defaults: PickFactoriedOptions<
    WithMiddlewareOptions<
      Options,
      Heap,
      LegacyMiddleware<Options, RequestType, ResponseType, Heap>
    >
  >
): MiddlewareFactorySignatureLegacy<Options, RequestType, ResponseType, Heap>;
export function middlewareFactory<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
>({
  use: defaultUse,
  useOnError: defaultUseOnError = [],
  options: defaultOptions
}: PickFactoriedOptions<
  | WithMiddlewareOptions<
      Options,
      Heap,
      ModernMiddleware<Options, Request, Response, Heap>
    >
  | WithMiddlewareOptions<
      Options,
      Heap,
      LegacyMiddleware<Options, NextApiRequestLike, NextApiResponseLike, Heap>
    >
>): unknown {
  type GenericReturnTypeParameters = Parameters<
    | MiddlewareFactorySignatureModern<Options, Request, Response, Heap>
    | MiddlewareFactorySignatureLegacy<
        Options,
        NextApiRequestLike,
        NextApiResponseLike,
        Heap
      >
  >;

  return function withFactoriedMiddleware(
    ...[handler, params]: GenericReturnTypeParameters
  ) {
    const {
      descriptor,
      prependUse = [],
      appendUse = [],
      prependUseOnError = [],
      appendUseOnError = [],
      options: additionalOptions
    } = params;

    // ? Reaching the limits of TypeScript here (probably options's fault)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return withMiddleware<any, any, any, any>(handler as any, {
      descriptor,
      use: [...prependUse, ...defaultUse, ...appendUse],
      useOnError: [...prependUseOnError, ...defaultUseOnError, ...appendUseOnError],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: { ...defaultOptions, ...additionalOptions } as any
    });
  };
}
