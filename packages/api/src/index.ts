/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { getEnv } from '@-xun/env';
import { sendHttpUnspecifiedError, sendNotImplemented } from '@-xun/respond';
import { toss } from 'toss-expression';

import { globalDebugLogger as debug } from 'universe+api:constant.ts';
import { ErrorMessage } from 'universe+api:error.ts';

import type { ExtendedDebugger } from 'rejoinder';
import type { UnextendableInternalLogger } from 'rejoinder/internal';
import type { EmptyObject, UnwrapTagged, Writable } from 'type-fest';

import type {
  NextApiRequestLike,
  NextApiResponseLike,
  PageConfigLike
} from 'multiverse+shared:next-like.ts';

import type {
  AsSyncLegacyTask,
  LegacyApiHandler,
  LegacyApiHandlerWithHeap,
  LegacyMiddleware,
  MiddlewareContext,
  MiddlewareFactorySignatureLegacy,
  MiddlewareFactorySignatureModern,
  ModernApiHandler,
  ModernApiHandlerWithHeap,
  ModernMiddleware,
  ModernOrLegacyMiddleware,
  PickFactoriedOptions,
  WithMiddlewareOptions
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
  LegacyApiHandler,
  LegacyApiHandlerWithHeap,
  LegacyMiddleware,
  LegacyMiddlewareContext,
  MiddlewareContext,
  ModernApiHandler,
  ModernApiHandlerWithHeap,
  ModernMiddleware,
  ModernMiddlewareContext
} from 'universe+api:types.ts';

/**
 * This function decorates a {@link Request} handler, returning a generic
 * {@link Response}-returning middleware runner function compatible with tools
 * like Cloudflare Workers.
 *
 * The returned function additionally exposes HTTP method properties (e.g.
 * `GET`, `POST`) compatible with the Next.js App Router. Which methods are
 * exposed depends on the `allowedMethods` option. Omitting this option, or
 * providing an empty array, means this endpoint will serve all methods
 * supported by the current framework/runtime.
 *
 * Returning a response from a middleware, or a handler, will cause that
 * response to be sent to the client immediately (after any `doAfterX` tasks are
 * run), meaning no other middleware nor the primary handler will run.
 *
 * Passing `undefined` as `handler`, or never returning a {@link Response} from
 * any of your middlewares/handler, will trigger an `HTTP 501 Not Implemented`
 * response. This can be used to to stub out endpoints and their middleware for
 * later implementation.
 */
export function withMiddleware<
  Options extends Record<string, unknown> = Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
>(
  handler: ModernApiHandlerWithHeap<Heap> | undefined,
  options: WithMiddlewareOptions<Options, Heap, ModernMiddleware<Options, Heap>>
): ModernApiHandler;
/**
 * This function decorates a {@link LegacyApiHandlerWithHeap}, returning a
 * middleware runner compatible with legacy middleware like Express or the
 * Next.js Pages router.
 *
 * Passing `undefined` as `handler`, or not calling `res.end()` nor sending
 * headers from at least one of your middlewares/handler, will trigger an `HTTP
 * 501 Not Implemented` response. This can be used to to stub out endpoints and
 * their middleware for later implementation.
 */
export function withMiddleware<
  Options extends Record<string, unknown> = Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
>(
  handler: LegacyApiHandlerWithHeap<Heap> | undefined,
  options: WithMiddlewareOptions<Options, Heap, LegacyMiddleware<Options, Heap>>
): LegacyApiHandler;
export function withMiddleware<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
>(
  handler: ModernApiHandlerWithHeap<Heap> | LegacyApiHandlerWithHeap<Heap> | undefined,
  {
    descriptor,
    use,
    useOnError,
    options
  }:
    | WithMiddlewareOptions<Options, Heap, ModernMiddleware<Options, Heap>>
    | WithMiddlewareOptions<Options, Heap, LegacyMiddleware<Options, Heap>>
): ModernApiHandler | LegacyApiHandler {
  return async function (
    reqOrRequest: NextApiRequestLike | Request,
    resOrUndefined: NextApiResponseLike | Response
  ) {
    const isInLegacyMode = !!options?.legacyMode;

    debug('-- begin (%O mode) --', isInLegacyMode ? 'LEGACY' : 'MODERN');

    const tasksToDoAfterHandled = [] as ModernOrLegacyMiddleware<Options, Heap>[];
    const tasksToDoAfterSent = [] as ModernOrLegacyMiddleware<Options, Heap>[];
    let $response_ = new Response();

    const {
      promise: legacyTasksPromiseAwaitedAfterSend,
      resolve: resolveLegacyTasksPromiseAwaitedAfterSend
    } = Promise.withResolvers();

    const middlewareContext: MiddlewareContext<
      Options,
      Heap,
      ModernOrLegacyMiddleware<Options, Heap>
    > & { runtime: { response: Response } } = {
      runtime: {
        endpoint: {
          descriptor
        },
        done: () => toss(new Error(ErrorMessage.RuntimeDoneCalledTooEarly())),
        error: undefined,
        doAfterHandled(middleware) {
          tasksToDoAfterHandled.push(
            middleware as ModernOrLegacyMiddleware<Options, Heap>
          );
        },
        doAfterSent(middleware) {
          tasksToDoAfterSent.push(middleware as ModernOrLegacyMiddleware<Options, Heap>);
        },
        get response() {
          return $response_;
        },
        // ? Setting a new response must augment, not replace, the old one!
        set response(value: Response) {
          if (value === $response_) {
            debug.message('ignored attempt to set context.runtime.response to itself');
            return;
          }

          // ? Adds support for a special escape hatched described in docs
          if ((value as typeof value | null) === null) {
            $response_ = new Response();
            return;
          }

          // ? Technically, value could be "void" (i.e. undefined)
          if (value instanceof Response) {
            const draftBody = value.bodyUsed ? null : value.body;
            const currentBody = $response_.bodyUsed ? null : $response_.body;
            const body = draftBody === null ? currentBody : draftBody;

            const draftResponse = new Response(body, {
              status:
                $response_.status >= 400
                  ? value.status >= 400
                    ? value.status
                    : $response_.status
                  : value.status || $response_.status,
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
        awaitTasksAfterSent: process.env.NODE_ENV === 'test',
        callDoneOnEnd: true,
        legacyMode: isInLegacyMode,
        ...options
      } as MiddlewareContext<
        Options,
        Heap,
        ModernOrLegacyMiddleware<Options, Heap>
      >['options']
    };

    const writableContextRuntime = middlewareContext.runtime as Writable<
      typeof middlewareContext.runtime
    >;

    if (isInLegacyMode) {
      const res = resOrUndefined as NextApiResponseLike;
      let ranDoAfterSent = false;

      const sendActual = res.end.bind(res);
      res.end = ((...args: Parameters<typeof res.end>) => {
        sendActual(...args);

        if (!ranDoAfterSent) {
          ranDoAfterSent = true;

          debug('running doAfterSent tasks after first call to res.end');

          restrictMiddlewareContext();
          resolveLegacyTasksPromiseAwaitedAfterSend(runTasksAfterSent());
        }

        return res;
      }) as typeof res.end;
    }

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
          ] as Parameters<typeof handler>);

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

          const resSent = res.writableEnded || res.headersSent;
          if (res.statusCode < 400 || !resSent) {
            // eslint-disable-next-line no-console
            console.error('unhandled error (error response not sent or status < 400)');

            if (!resSent) {
              sendHttpUnspecifiedError(res);
            }
          }
        } else {
          if (middlewareContext.runtime.response.status < 400) {
            // eslint-disable-next-line no-console
            console.error('unhandled error (error response status < 400)');
            middlewareContext.runtime.response = sendHttpUnspecifiedError();
          }
        }
      } finally {
        debug('-- useOnError chain done --');
      }
    }

    restrictMiddlewareContext();

    if (isInLegacyMode) {
      const res = resOrUndefined as NextApiResponseLike;

      // ? Catch any unsent responses
      if (res.writableEnded && !res.headersSent) {
        throw new Error(ErrorMessage.ReachedEndOfRuntime());
      }

      if (options.awaitTasksAfterSent) {
        debug('awaiting middleware after sent...');
        await legacyTasksPromiseAwaitedAfterSend;
      }

      return undefined;
    }

    // ? Just in case something weird happened...
    resolveLegacyTasksPromiseAwaitedAfterSend(undefined);

    // ? Returns a promise when in modern mode
    await runTasksAfterHandled();
    const promisedMiddlewareAfterSent = runTasksAfterSent();

    if (options?.awaitTasksAfterSent) {
      await promisedMiddlewareAfterSent;
    }

    return middlewareContext.runtime.response;

    function restrictMiddlewareContext() {
      writableContextRuntime.doAfterHandled = () =>
        toss(new Error(ErrorMessage.RuntimeDoAfterHandledCalledTooLate()));
      writableContextRuntime.doAfterSent = () =>
        toss(new Error(ErrorMessage.RuntimeDoAfterSentCalledTooLate()));
      writableContextRuntime.done = () =>
        toss(new Error(ErrorMessage.RuntimeDoneCalledTooLate()));
    }

    function runTasksAfterHandled() {
      if (isInLegacyMode) {
        try {
          for (const middleware of tasksToDoAfterHandled) {
            try {
              const typedMiddleware = middleware as AsSyncLegacyTask<
                LegacyMiddleware<Options, Heap>
              >;

              const [req, res] = [
                reqOrRequest as NextApiRequestLike,
                resOrUndefined as NextApiResponseLike
              ];

              typedMiddleware(
                req,
                res,
                middlewareContext as MiddlewareContext<
                  Options,
                  Heap,
                  LegacyMiddleware<Options, Heap>
                >
              );
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error(
                'a middleware task added via doAfterHandled failed (which was ignored): %O',
                error
              );
            }
          }
        } finally {
          debug('-- sync doAfterHandled tasks done --');
        }
      } else {
        const request = reqOrRequest as Request;
        return Promise.resolve().then(async function () {
          try {
            for (const middleware of tasksToDoAfterHandled) {
              try {
                const typedMiddleware = middleware as ModernMiddleware<Options, Heap>;

                const returnValue =
                  (await typedMiddleware(
                    request,
                    middlewareContext as MiddlewareContext<
                      Options,
                      Heap,
                      typeof typedMiddleware
                    >
                  )) || writableContextRuntime.response;

                const shouldShortCircuit =
                  returnValue !== writableContextRuntime.response;

                writableContextRuntime.response = returnValue;

                if (shouldShortCircuit) {
                  debug.message(
                    'a task added via doAfterHandled returned a Reponse, which will be sent immediately (other doAfterHandled tasks will be skipped)'
                  );

                  break;
                }
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error(
                  'a task added via doAfterHandled failed (which was ignored): %O',
                  error
                );
              }
            }
          } finally {
            debug('-- async doAfterHandled tasks done --');
          }
        });
      }
    }

    async function runTasksAfterSent() {
      try {
        for (const middleware of tasksToDoAfterSent) {
          try {
            if (isInLegacyMode) {
              const typedMiddleware = middleware as LegacyMiddleware<Options, Heap>;

              const [req, res] = [
                reqOrRequest as NextApiRequestLike,
                resOrUndefined as NextApiResponseLike
              ];

              await typedMiddleware(
                req,
                res,
                middlewareContext as MiddlewareContext<
                  Options,
                  Heap,
                  typeof typedMiddleware
                >
              );
            } else {
              const request = reqOrRequest as Request;
              const typedMiddleware = middleware as ModernMiddleware<Options, Heap>;

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
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(
              'a middleware task added via doAfterSent failed (which was ignored): %O',
              error
            );
          }
        }
      } finally {
        debug('-- doAfterSent tasks done --');
      }
    }

    /**
     * Async middleware chain iteration. Returns `true` if execution was aborted
     * or `false` otherwise.
     */
    async function startPullingChain(
      chain: IterableIterator<
        | UnwrapTagged<ModernMiddleware<Options, Heap>>
        | UnwrapTagged<LegacyMiddleware<Options, Heap>>
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

          const sendActual = res.end.bind(res);
          res.end = ((...args: Parameters<typeof res.end>) => {
            if (!res.writableEnded && !res.headersSent) {
              if (!executionWasAborted && !executionCompleted) {
                localDebug('calling runtime.done after first call to res.end');
                middlewareContext.runtime.done();
              } else {
                localDebug(
                  'skipped calling runtime.done since chain already finished executing'
                );
              }
            }

            sendActual(...args);
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
              const typedCurrentMiddleware =
                currentMiddleware as unknown as LegacyMiddleware<Options, Heap>;

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
              const typedCurrentMiddleware =
                currentMiddleware as unknown as ModernMiddleware<Options, Heap>;

              const returnValue =
                (await typedCurrentMiddleware(
                  request,
                  middlewareContext as MiddlewareContext<
                    Options,
                    Heap,
                    typeof typedCurrentMiddleware
                  >
                )) || writableContextRuntime.response;

              const shouldShortCircuit = returnValue !== writableContextRuntime.response;

              writableContextRuntime.response = returnValue;

              if (shouldShortCircuit) {
                localDebug(
                  'calling runtime.done after pullChain completed since a Response was returned'
                );

                middlewareContext.runtime.done();
              }
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
  Options extends Record<string, unknown> = EmptyObject,
  Heap extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
>(
  defaults: PickFactoriedOptions<
    WithMiddlewareOptions<Options, Heap, ModernMiddleware<Options, Heap>>
  >
): MiddlewareFactorySignatureModern<Options, Heap>;
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
  Options extends Record<string, unknown> = EmptyObject,
  Heap extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
>(
  defaults: PickFactoriedOptions<
    WithMiddlewareOptions<Options, Heap, LegacyMiddleware<Options, Heap>>
  >
): MiddlewareFactorySignatureLegacy<Options, Heap>;
export function middlewareFactory<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
>({
  use: defaultUse,
  useOnError: defaultUseOnError = [],
  options: defaultOptions
}: PickFactoriedOptions<
  | WithMiddlewareOptions<Options, Heap, ModernMiddleware<Options, Heap>>
  | WithMiddlewareOptions<Options, Heap, LegacyMiddleware<Options, Heap>>
>): unknown {
  type GenericReturnTypeParameters = Parameters<
    | MiddlewareFactorySignatureModern<Options, Heap>
    | MiddlewareFactorySignatureLegacy<Options, Heap>
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

    return Reflect.apply(withMiddleware, null, [
      handler,
      {
        descriptor,
        use: [...prependUse, ...defaultUse, ...appendUse],
        useOnError: [...prependUseOnError, ...defaultUseOnError, ...appendUseOnError],
        options: { ...defaultOptions, ...additionalOptions }
      }
    ]);
  };
}

/**
 * The default app-wide configuration object for legacy Next.js APIs.
 *
 * @see https://nextjs.org/docs/api-routes/api-middlewares#custom-config
 */
export const defaultLegacyPageConfig: PageConfigLike = {
  api: {
    bodyParser: {
      get sizeLimit() {
        return getEnv().MAX_CONTENT_LENGTH_BYTES;
      }
    }
  }
};
