/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { Promisable, Tagged, UnwrapTagged } from 'type-fest';

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
 * Note that this type of handler is not necessarily consumable by third parties
 * (see {@link ModernBasicApiHandler}).
 */
export type ModernApiHandler<
  RequestType extends Request,
  ResponseType extends Response,
  Heap extends Record<PropertyKey, unknown>
> = (request: RequestType, ctx: Heap) => Promisable<ResponseType | undefined | void>;

/**
 * A generic version of {@link ModernApiHandler}.
 */
export type GenericModernApiHandler = ModernApiHandler<
  Request,
  Response,
  Record<PropertyKey, unknown>
>;

/**
 * The shape of a modern fetch request handler that is also consumable by third
 * parties.
 *
 * This is a reduced-functionality version of {@link ModernApiHandler}.
 */
export type ModernBasicApiHandler<
  RequestType extends Request = Request,
  ResponseType extends Response = Response
> = (request: RequestType) => Promisable<ResponseType | undefined | void>;

/**
 * The shape of a modern middleware function.
 */
export type ModernMiddleware<
  Options extends Record<string, unknown>,
  RequestType extends Request,
  ResponseType extends Response,
  Heap extends Record<PropertyKey, unknown>
> = WithModernTag<
  (
    request: RequestType,
    context: MiddlewareContext<
      Options,
      Heap,
      ModernMiddleware<Options, RequestType, ResponseType, Heap>
    >
  ) => Promisable<ResponseType | undefined | void>
>;

/**
 * A generic version of {@link ModernMiddleware}.
 */
export type GenericModernMiddleware = ModernMiddleware<
  Record<string, unknown>,
  Request,
  Response,
  Record<PropertyKey, unknown>
>;

/**
 * The shape of a legacy fetch request handler.
 *
 * Note that this type of handler is not necessarily consumable by third parties
 * (see {@link LegacyBasicApiHandler}).
 */
export type LegacyApiHandler<
  RequestType extends NextApiRequestLike,
  ResponseType extends NextApiResponseLike,
  Heap extends Record<PropertyKey, unknown>
> = (req: RequestType, res: ResponseType, ctx: Heap) => Promisable<unknown>;

/**
 * A generic version of {@link LegacyApiHandler}.
 */
export type GenericLegacyApiHandler = LegacyApiHandler<
  NextApiRequestLike,
  NextApiResponseLike,
  Record<PropertyKey, unknown>
>;

/**
 * The shape of a legacy fetch request handler that is also consumable by third
 * parties.
 *
 * This is a reduced-functionality version of {@link LegacyApiHandler}.
 */
export type LegacyBasicApiHandler<
  RequestType extends NextApiRequestLike = NextApiRequestLike,
  ResponseType extends NextApiResponseLike = NextApiResponseLike
> = (req: RequestType, res: ResponseType) => Promisable<unknown>;

/**
 * The shape of a legacy middleware function.
 */
export type LegacyMiddleware<
  Options extends Record<string, unknown>,
  RequestType extends NextApiRequestLike,
  ResponseType extends NextApiResponseLike,
  Heap extends Record<PropertyKey, unknown>
> = WithLegacyTag<
  (
    req: RequestType,
    res: ResponseType,
    context: MiddlewareContext<
      Options,
      Heap,
      LegacyMiddleware<Options, RequestType, ResponseType, Heap>
    >
  ) => Promisable<unknown>
>;

/**
 * A generic version of {@link LegacyMiddleware}.
 */
export type GenericLegacyMiddleware = LegacyMiddleware<
  Record<string, unknown>,
  NextApiRequestLike,
  NextApiResponseLike,
  Record<PropertyKey, unknown>
>;

/**
 * The union of {@link ModernMiddleware} and {@link LegacyMiddleware} that allow
 * any request/response shape.
 */
export type AnyMiddleware<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ModernMiddleware<Options, any, any, Heap>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | LegacyMiddleware<Options, any, any, Heap>;

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
  Middleware extends AnyMiddleware<Options, Heap>
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
     * Call the next middleware function in the use chain. If not called
     * explicitly before a middleware function resolves, and `done()` was also
     * not called, `next()` will be called automatically. This means calling
     * `next()` in a middleware function is entirely optional.
     */
    readonly next: () => Promise<void>;
    /**
     * Stop calling middleware functions, effectively aborting execution of the
     * use chain. If a {@link Response} has not yet been returned (or
     * `response.end` hasn't been called if in legacy mode) before calling this
     * function, it will be called automatically. On abort, the handler will
     * also be skipped.
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
     * Middleware with tasks that need to execute after the handler completes
     * successfully _but before the response is sent_ (e.g. cors) should add
     * those tasks via this function.
     *
     * Tasks are always executed in order after the `use` middleware chain, the
     * handler, and/or the `useOnError` chain (when applicable) all execute
     * successfully.
     *
     * **Unlike with `doAfterSent`, these internal middleware will ALWAYS delay
     * the server from responding to a request.**
     *
     * Note that errors thrown by middleware added by this function are ignored.
     */
    readonly doAfterHandled: (middleware: UnwrapTagged<Middleware>) => void;
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
     * successfully.
     *
     * **Unlike with `doAfterHandled`, these internal middleware will NEVER
     * delay the server from responding to a request.**
     *
     * Note that errors thrown by middleware added by this function are ignored.
     */
    readonly doAfterSent: (middleware: UnwrapTagged<Middleware>) => void;
    /**
     * For modern non-legacy middleware, this property contains the latest
     * {@link Response} instance returned by some earlier middleware or handler.
     *
     * Once all middleware and handlers finish running, `response` is passed to
     * the server for final processing.
     *
     * Note that mutating `response` in middleware added via `doAfterSent` will
     * have no effect.
     */
    readonly response: Middleware extends WithModernTag<unknown> ? Response : undefined;
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
  options: Options & {
    /**
     * If `true`, `context.runtime.done` is called whenever a {@link Response}
     * is returned (or `response.end` is called if in legacy mode) before the
     * middleware chain completes execution. If `false`, the entire primary
     * middleware chain will always run to completion, even if the response has
     * already been sent before it completes.
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
  };
};

/**
 * Meant for use when typing middleware function parameters.
 *
 * @see {@link MiddlewareContext}
 */
export type ModernMiddlewareContext<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>,
  RequestType extends Request = Request,
  ResponseType extends Response = Response
> = MiddlewareContext<
  Options,
  Heap,
  ModernMiddleware<Options, RequestType, ResponseType, Heap>
>;

/**
 * Meant for use when typing middleware function parameters.
 *
 * @see {@link MiddlewareContext}
 */
export type LegacyMiddlewareContext<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>,
  RequestType extends NextApiRequestLike = NextApiRequestLike,
  ResponseType extends NextApiResponseLike = NextApiResponseLike
> = MiddlewareContext<
  Options,
  Heap,
  LegacyMiddleware<Options, RequestType, ResponseType, Heap>
>;

/**
 * @see `withMiddleware`
 */
export type WithMiddlewareOptions<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>,
  Middleware extends AnyMiddleware<Options, Heap>
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
  use: UnwrapTagged<Middleware>[];
  /**
   * When a middleware or handler throws, this secondary array of middleware
   * functions are executed in order similar to `use`.
   *
   * Unlike `use`, error-handling middleware have access to the
   * `MiddlewareContext.runtime.error` property, which contains the uncaught
   * error that interrupted the primary use chain.
   */
  useOnError?: UnwrapTagged<Middleware>[];
  /**
   * Various options made available to all middleware and handlers.
   */
  options?: Partial<MiddlewareContext<Options, Heap, Middleware>['options']>;
} & (Middleware extends WithModernTag<unknown>
  ? { options?: { legacyMode?: false } }
  : Middleware extends WithLegacyTag<unknown>
    ? { options: { legacyMode: true } }
    : object);

/**
 * @see `withMiddleware`
 */
export type WithMiddlewareSignatureModern<
  Options extends Record<string, unknown>,
  RequestType extends Request,
  ResponseType extends Response,
  Heap extends Record<PropertyKey, unknown>
> = (
  handler: ModernApiHandler<RequestType, ResponseType, Heap> | undefined,
  options: WithMiddlewareOptions<
    Options,
    Heap,
    ModernMiddleware<Options, RequestType, ResponseType, Heap>
  >
) => ModernBasicApiHandler<RequestType, ResponseType>;

/**
 * @see `withMiddleware`
 */
export type WithMiddlewareSignatureLegacy<
  Options extends Record<string, unknown>,
  RequestType extends NextApiRequestLike,
  ResponseType extends NextApiResponseLike,
  Heap extends Record<PropertyKey, unknown>
> = (
  handler: LegacyApiHandler<RequestType, ResponseType, Heap> | undefined,
  options: WithMiddlewareOptions<
    Options,
    Heap,
    LegacyMiddleware<Options, RequestType, ResponseType, Heap>
  >
) => LegacyBasicApiHandler<RequestType, ResponseType>;

/**
 * {@link middlewareFactory}
 */
export type FactoriedMiddlewareOptions<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>,
  Middleware extends AnyMiddleware<Options, Heap>
> = Omit<WithMiddlewareOptions<Options, Heap, Middleware>, 'use' | 'useOnError'> & {
  /**
   * @see {@link WithMiddlewareOptions.use}
   */
  prependUse?: UnwrapTagged<Middleware>[];
  /**
   * @see {@link WithMiddlewareOptions.use}
   */
  appendUse?: UnwrapTagged<Middleware>[];
  /**
   * @see {@link WithMiddlewareOptions.useOnError}
   */
  prependUseOnError?: UnwrapTagged<Middleware>[];
  /**
   * @see {@link WithMiddlewareOptions.useOnError}
   */
  appendUseOnError?: UnwrapTagged<Middleware>[];
};

/**
 * {@link middlewareFactory}
 */
export type MiddlewareFactorySignatureModern<
  Options extends Record<string, unknown>,
  RequestType extends Request,
  ResponseType extends Response,
  Heap extends Record<PropertyKey, unknown>
> = (
  handler: ModernApiHandler<RequestType, ResponseType, Heap> | undefined,
  options: FactoriedMiddlewareOptions<
    Options,
    Heap,
    ModernMiddleware<Options, RequestType, ResponseType, Heap>
  >
) => ModernBasicApiHandler<RequestType, ResponseType>;

/**
 * {@link middlewareFactory}
 */
export type MiddlewareFactorySignatureLegacy<
  Options extends Record<string, unknown>,
  RequestType extends NextApiRequestLike,
  ResponseType extends NextApiResponseLike,
  Heap extends Record<PropertyKey, unknown>
> = (
  handler: LegacyApiHandler<RequestType, ResponseType, Heap> | undefined,
  options: FactoriedMiddlewareOptions<
    Options,
    Heap,
    LegacyMiddleware<Options, RequestType, ResponseType, Heap>
  >
) => LegacyBasicApiHandler<RequestType, ResponseType>;

/**
 * @internal
 */
export type PickFactoriedOptions<T extends Record<string, unknown>> = Pick<
  T,
  'use' | 'useOnError' | 'options'
>;
