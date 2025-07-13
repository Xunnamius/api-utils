/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { ValidHttpMethod } from '@-xun/types';
import type { Promisable, SetReturnType, Tagged, UnwrapTagged } from 'type-fest';

import type {
  NextApiRequestLike,
  NextApiResponseLike
} from 'multiverse+shared:next-like.ts';

/**
 * Used to help structurally differentiate {@link ModernMiddleware} from
 * {@link LegacyMiddleware}.
 */
export type WithModernTag<T> = Tagged<T, 'modern'>;

/**
 * Used to help structurally differentiate {@link ModernMiddleware} from
 * {@link LegacyMiddleware}.
 */
export type WithLegacyTag<T> = Tagged<T, 'legacy'>;

/**
 * The shape of a modern fetch request handler.
 *
 * Note that returning a {@link Response} instance will immediately send a
 * response and end the middleware execution chain. To prevent the chain from
 * ending, do not return a {@link Response}. To edit the current response in
 * passing, see the `runtime.response` property of {@link MiddlewareContext}.
 */
export type ModernApiHandler = ((
  request: Request
) => Promisable<Response | undefined | void>) & {
  // ? Sugar for Next.js's app router
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [method in ValidHttpMethod]?: Extract<ModernApiHandler, Function>;
};

/**
 * The shape of a modern fetch request handler + an additional context
 * parameter.
 *
 * Note that returning a {@link Response} instance will immediately send a
 * response and end the middleware execution chain. To prevent the chain from
 * ending, do not return a {@link Response}. To edit the current response in
 * passing, see the `runtime.response` property of {@link MiddlewareContext}.
 *
 * Also note that this type of handler is not necessarily consumable by third
 * parties (see {@link ModernApiHandler} for that).
 */
export type ModernApiHandlerWithHeap<Heap extends Record<PropertyKey, unknown>> = (
  request: Request,
  handlerContext: Heap
) => Promisable<Response | undefined | void>;

/**
 * The shape of a modern middleware function.
 */
export type ModernMiddleware<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
> = WithModernTag<
  (
    request: Request,
    middlewareContext: MiddlewareContext<Options, Heap, ModernMiddleware<Options, Heap>>
  ) => Promisable<Response | undefined | void>
>;

/**
 * The shape of a legacy fetch request handler that is also consumable by third
 * parties (currently optimized for Next.js's Pages router).
 *
 * This is a reduced-functionality version of {@link LegacyApiHandlerWithHeap}.
 */
export type LegacyApiHandler = (
  req: NextApiRequestLike,
  res: NextApiResponseLike
) => Promisable<unknown>;

/**
 * The shape of a legacy fetch request handler.
 *
 * Note that this type of handler is not necessarily consumable by third parties
 * (see {@link LegacyApiHandler}).
 */
export type LegacyApiHandlerWithHeap<Heap extends Record<PropertyKey, unknown>> = (
  req: NextApiRequestLike,
  res: NextApiResponseLike,
  handlerContext: Heap
) => Promisable<unknown>;

/**
 * The shape of a legacy middleware function.
 */
export type LegacyMiddleware<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
> = WithLegacyTag<
  (
    req: NextApiRequestLike,
    res: NextApiResponseLike,
    middlewareContext: MiddlewareContext<Options, Heap, LegacyMiddleware<Options, Heap>>
  ) => Promisable<unknown>
>;

/**
 * This type exists for the benefit of legacy middleware.
 */
export type AsSyncLegacyTask<Middleware extends LegacyMiddleware<any, any>> =
  SetReturnType<UnwrapTagged<Middleware>, Awaited<ReturnType<Middleware>>>;

/**
 * The union of {@link ModernMiddleware} and {@link LegacyMiddleware}.
 */
export type ModernOrLegacyMiddleware<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
> = ModernMiddleware<Options, Heap> | LegacyMiddleware<Options, Heap>;

/**
 * The shape of the return type of a middleware function exported by a file
 * under the `middleware/` directory. Supports both the legacy and modern
 * middleware interfaces simultaneously (hence the awkward parameterization).
 *
 * This type if meant for end-users and isn't used internally by the library.
 */
export type ExportedMiddleware<
  Options extends Record<string, unknown> = Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
> = (
  reqOrRequest: NextApiRequestLike | Request,
  resOrModernContext: NextApiResponseLike | ModernMiddlewareContext<Options, Heap>,
  maybeLegacyContext?: LegacyMiddlewareContext<Options, Heap>
) => Promisable<Response | undefined | void>;

/**
 * The shape of a middleware context object, potentially customized with
 * additional middleware-specific options.
 *
 * Middleware functions should be order-agnostic. That is: the system should not
 * crash simply because the order of middleware functions (before or after the
 * handler executes respectively) changes.
 */
export type MiddlewareContext<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>,
  Middleware extends ModernOrLegacyMiddleware<Options, Heap>,
  PartialOptions extends 'partial' | 'required' = 'required'
> = {
  /**
   * Contains middleware use chain control functions and various metadata.
   */
  runtime: {
    /**
     * Metadata describing the current endpoint.
     */
    endpoint: {
      /**
       * A parameterized path string in the form of a URI path corresponding to
       * the current endpoint. For example: `/my-endpoint/:some_id`.
       *
       * Used for logging purposes only.
       */
      descriptor?: string;
    };
    /**
     * Stop calling middleware functions, effectively aborting execution of the
     * current chain. If a {@link Response} has not yet been returned (or
     * `response.end` hasn't been called if in legacy mode) before calling this
     * function, it will be called automatically. On abort, the handler will
     * also be skipped, but any registered tasks will _not_ be skipped.
     *
     * Note that, though they have access to the same middleware context as
     * actual middleware, the `runtime.done`, `runtime.doAfterHandled`, and
     * `runtime.doAfterSent` methods are unavailable to tasks (which are added
     * via `doAfterHandled`/`doAfterSent`).
     */
    readonly done: () => void;
    /**
     * For middleware run via `useOnError` (and `postHandlerTasks`), the `error`
     * property will contain the thrown error object.
     */
    readonly error: unknown;
    /**
     * Appends `middleware` to list of special internal middlewares that are
     * added and removed only by other middleware; they are not end-user facing.
     *
     * Modern middleware with tasks that need to execute after the handler
     * completes successfully _but before the response is sent_ (e.g. cors)
     * should add those tasks via this function.
     *
     * This method is only available when using modern middleware. When using
     * legacy middleware, handle any "post-handler" tasks using the `res`
     * parameter instead.
     *
     * Tasks are always executed in order after the `use` middleware chain, the
     * handler, and/or the `useOnError` chain (when applicable) all execute
     * successfully. And, though they have access to the same middleware context
     * as actual middleware, the `runtime.done`, `runtime.doAfterHandled`, and
     * `runtime.doAfterSent` methods are unavailable to tasks.
     *
     * **Unlike with `doAfterSent`, these internal middleware will ALWAYS delay
     * the server from responding to a request.**
     *
     * Note that errors thrown by middleware added by this function are ignored.
     */
    readonly doAfterHandled: Middleware extends WithModernTag<unknown>
      ? (middleware: UnwrapTagged<Middleware>) => void
      : undefined;
    /**
     * Appends `middleware` to list of special internal middlewares that are
     * added and removed only by other middleware; they are not end-user facing.
     *
     * Middleware with tasks that need to execute after the handler completes
     * successfully _and after the response is sent_ (e.g. logging) should add
     * those tasks via this function.
     *
     * Tasks are always executed in order after the `use` middleware chain, the
     * handler, and/or the `useOnError` chain (when applicable) all execute
     * successfully. And, though they have access to the same middleware context
     * as actual middleware, the `runtime.done`, `runtime.doAfterHandled`, and
     * `runtime.doAfterSent` methods are unavailable to tasks.
     *
     * **Unlike with `doAfterHandled`, these internal middleware will (1) always
     * run asynchronously regardless of legacy/modern and (2) NEVER delay the
     * server from responding to a request.**
     *
     * Note that errors thrown by middleware added by this function are ignored.
     */
    readonly doAfterSent: (middleware: UnwrapTagged<Middleware>) => void;
    /**
     * For modern non-legacy middleware, this property contains the latest
     * {@link Response} instance returned by some earlier middleware or handler.
     *
     * To modify the current response without sending it to the client
     * immediately (which is what happens when you return a {@link Response}
     * from some middleware or handler), mutate this property.
     *
     * Do note that this property is backed by a setter function that will
     * **merge the modified {@link Response} on top of the current
     * {@link Response}**. This is also true of {@link Response}s that are
     * returned normally.
     *
     * To overwrite an existing response body, use `''` instead of `null`, with
     * the latter being ignored in favor of existing content. To overwrite an
     * existing response status, pass it to the {@link Response} constructor as
     * normal. Note that (1) not passing a status to the {@link Response}
     * constructor defaults it to `HTTP 200`, which will overwrite the current
     * status and (2) once a status >=400 is set, requests with statuses <400
     * will have their statuses ignored when merged. To preserve the current
     * response status instead of overwriting it, pass in
     * `runtime.response.status` when constructing the new {@link Response}.
     *
     * To dangerously _completely_ overwrite the current `runtime.response`
     * property, first set it to `null`, which will cause it to reset to its
     * default initial value (i.e. `new Response()`). This is not recommended
     * (nor supported by intellisense), since middleware can be invoked in any
     * order and modify the response in various unpredictable ways.
     *
     * Once all middleware and handlers finish running, this property is passed
     * directly to the server for final processing.
     *
     * Also note that mutating this property in middleware added via
     * `doAfterSent` will have no effect.
     */
    response: Middleware extends WithModernTag<unknown> ? Response : undefined;
  };
  /**
   * A context object meant to be written to and read by any middleware.
   *
   * After all middleware is finished running, `heap` is passed to the handler
   * as its `ctx` parameter, allowing middleware and handlers to more easily
   * share data.
   */
  heap: Heap;
  /**
   * Options expected by middleware functions at runtime.
   */
  options: Options &
    ('partial' extends PartialOptions ? Partial<BaseOptions> : BaseOptions) &
    (Middleware extends WithModernTag<unknown>
      ? {
          /**
           * An array of HTTP methods this endpoint is allowed to serve.
           *
           * Omitting this option, or providing an empty array, means this
           * endpoint will serve all methods supported by the current
           * framework/runtime.
           */
          allowedMethods?: ValidHttpMethod[];
        }
      : object);
};

type BaseOptions = {
  /**
   * If `true` and `legacyMode` is also `true`, `context.runtime.done` is called
   * whenever `res.end()` is called before the middleware chain completes
   * execution.
   *
   * If `false` (or if `legacyMode` is `false`), the entire primary middleware
   * chain will always run to completion, even if the response has already been
   * sent before it completes.
   *
   * @default true
   */
  callDoneOnEnd: boolean;
  /**
   * If `true`, the middleware assumes a legacy runtime environment (e.g.
   * Next.js Pages router or Express middleware). Otherwise, a modern runtime
   * environment is assumed (e.g. using {@link Request} and {@link Response})
   *
   * @default false
   */
  legacyMode: boolean;
  /**
   * By default, both modern and legacy usage of `withMiddleware` will return a
   * response as soon as possible by _not_ awaiting the promises generated by
   * calling `doAfterSent()`.
   *
   * To make testing easier, `withMiddleware` can be configured to await said
   * promises instead; when `true`, the `doAfterSent` middleware promises will
   * complete before the response is returned or "sent" by this function.
   *
   * Do not enable this in production.
   *
   * @default process.env.NODE_ENV === 'test'
   */
  awaitTasksAfterSent: boolean;
};

/**
 * Meant for use when typing middleware function parameters.
 *
 * @see {@link MiddlewareContext}
 */
export type ModernMiddlewareContext<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
> = MiddlewareContext<Options, Heap, ModernMiddleware<Options, Heap>>;

/**
 * Meant for use when typing middleware function parameters.
 *
 * @see {@link MiddlewareContext}
 */
export type LegacyMiddlewareContext<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
> = MiddlewareContext<Options, Heap, LegacyMiddleware<Options, Heap>>;

/**
 * @see `withMiddleware`
 */
export type WithMiddlewareOptions<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>,
  Middleware extends ModernOrLegacyMiddleware<Options, Heap>
> = {
  /**
   * A parameterized path string in the form of a URI path corresponding to the
   * current endpoint. For example: `/my-endpoint/:some_id`.
   *
   * Used for logging purposes only.
   */
  descriptor: MiddlewareContext<
    Options,
    Heap,
    Middleware
  >['runtime']['endpoint']['descriptor'];
  /**
   * An array of middleware functions that will be executed in order, each
   * receiving a chance to mutate the request and short-circuit the "use chain"
   * to deliver a response.
   */
  use: ExportedMiddleware<any, any>[];
  /**
   * When a middleware or handler throws, this secondary array of middleware
   * functions are executed in order similar to `use`.
   *
   * Unlike `use`, error-handling middleware have access to the
   * `MiddlewareContext.runtime.error` property, which contains the uncaught
   * error that interrupted the primary use chain.
   */
  useOnError?: ExportedMiddleware<any, any>[];
  /**
   * Various options made available to all middleware and handlers.
   */
  options?: MiddlewareContext<Options, Heap, Middleware, 'partial'>['options'];
} & (Middleware extends WithModernTag<unknown>
  ? Partial<Options> extends Options
    ? { options?: { legacyMode?: false } }
    : { options: { legacyMode?: false } }
  : Middleware extends WithLegacyTag<unknown>
    ? { options: { legacyMode: true } }
    : object);

/**
 * {@link middlewareFactory}
 */
export type FactoriedMiddlewareOptions<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>,
  Middleware extends ModernOrLegacyMiddleware<Options, Heap>
> = Partial<
  Omit<
    WithMiddlewareOptions<Options, Heap, Middleware>,
    'use' | 'useOnError' | 'options'
  >
> & {
  options?: Partial<WithMiddlewareOptions<Options, Heap, Middleware>['options']>;
} & {
  /**
   * @see {@link WithMiddlewareOptions.use}
   */
  prependUse?: ExportedMiddleware<any, any>[];
  /**
   * @see {@link WithMiddlewareOptions.use}
   */
  appendUse?: ExportedMiddleware<any, any>[];
  /**
   * @see {@link WithMiddlewareOptions.useOnError}
   */
  prependUseOnError?: ExportedMiddleware<any, any>[];
  /**
   * @see {@link WithMiddlewareOptions.useOnError}
   */
  appendUseOnError?: ExportedMiddleware<any, any>[];
};

/**
 * {@link middlewareFactory}
 */
export type MiddlewareFactorySignatureModern<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
> = (
  handler: ModernApiHandlerWithHeap<Heap> | undefined,
  options: FactoriedMiddlewareOptions<Options, Heap, ModernMiddleware<Options, Heap>>
) => ModernApiHandler;

/**
 * {@link middlewareFactory}
 */
export type MiddlewareFactorySignatureLegacy<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
> = (
  handler: LegacyApiHandlerWithHeap<Heap> | undefined,
  options: FactoriedMiddlewareOptions<Options, Heap, LegacyMiddleware<Options, Heap>>
) => LegacyApiHandler;

/**
 * @internal
 */
export type PickFactoriedOptions<T extends Record<string, unknown>> = Pick<
  T,
  'use' | 'useOnError' | 'options'
>;
