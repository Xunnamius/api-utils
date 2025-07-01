/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { Promisable, Tagged, UnwrapTagged } from 'type-fest';

import type {
  NextApiRequestLike,
  NextApiResponseLike
} from 'universe+shared:next-like.ts';

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
 * Note that this type of handler is not necessarily consumable by third
 * parties (see {@link ModernBasicApiHandler}).
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
    context: MiddlewareContext<Options, Heap>
  ) => Promisable<ResponseType | undefined | void>
>;

/**
 * A generic tag-less version of {@link ModernMiddleware}.
 */
export type GenericModernMiddleware = UnwrapTagged<
  ModernMiddleware<
    Record<string, unknown>,
    Request,
    Response,
    Record<PropertyKey, unknown>
  >
>;

/**
 * The shape of a legacy fetch request handler.
 *
 * Note that this type of handler is not necessarily consumable by third
 * parties (see {@link LegacyBasicApiHandler}).
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
    context: MiddlewareContext<Options, Heap>
  ) => Promisable<unknown>
>;

/**
 * A generic tag-less version of {@link LegacyMiddleware}.
 */
export type GenericLegacyMiddleware = UnwrapTagged<
  LegacyMiddleware<
    Record<string, unknown>,
    NextApiRequestLike,
    NextApiResponseLike,
    Record<PropertyKey, unknown>
  >
>;

/**
 * The shape of a middleware context object, potentially customized with
 * additional middleware-specific options.
 *
 * Middleware should default to the most restrictive configuration possible if
 * its respective options are missing.
 */
export type MiddlewareContext<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>
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
       * Use for logging purposes only.
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
     * For middleware run via `useOnError`, the `error` property will contain
     * the thrown error object.
     */
    readonly error: unknown;
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
 * {@link withMiddleware}
 */
export type WithMiddlewareOptions<
  Options extends Record<string, unknown>,
  Heap extends Record<PropertyKey, unknown>,
  Middleware extends
    | ModernMiddleware<Options, any, any, Heap>
    | LegacyMiddleware<Options, any, any, Heap>
> = {
  descriptor: MiddlewareContext<Options, Heap>['runtime']['endpoint']['descriptor'];
  use: UnwrapTagged<Middleware>[];
  useOnError?: UnwrapTagged<Middleware>[];
  options?: Partial<MiddlewareContext<Options, Heap>['options']>;
} & (Middleware extends WithModernTag<unknown>
  ? { options?: { legacyMode?: false } }
  : Middleware extends WithLegacyTag<unknown>
    ? { options: { legacyMode: true } }
    : object);

/**
 * {@link withMiddleware}
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
 * {@link withMiddleware}
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
  Middleware extends
    | ModernMiddleware<Options, any, any, Heap>
    | LegacyMiddleware<Options, any, any, Heap>
> = Omit<WithMiddlewareOptions<Options, Heap, Middleware>, 'use' | 'useOnError'> & {
  prependUse?: UnwrapTagged<Middleware>[];
  appendUse?: UnwrapTagged<Middleware>[];
  prependUseOnError?: UnwrapTagged<Middleware>[];
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
