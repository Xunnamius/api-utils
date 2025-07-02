/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { getAuthedClientToken } from '@-xun/api-strategy/auth';

import { globalDebugLogger } from 'universe+api:constant.ts';

import type { TokenAttributesFilter } from '@-xun/api-strategy/auth';
import type { EmptyObject } from 'type-fest';

import type {
  LegacyMiddlewareContext,
  MiddlewareContext,
  ModernMiddlewareContext,
  NextApiRequestLike,
  NextApiResponseLike
} from 'universe+api';

import type { AnyMiddleware } from 'universe+api:types.ts';

const debug = globalDebugLogger.extend('auth-request');

export type Options = {
  /**
   * If not `false` or falsy, accessing this endpoint requires a valid (yet
   * unfortunately named) Authorization header.
   *
   * If a filter is provided, the request will be authorized conditioned upon
   * said filter (see {@link getAuthedClientToken} and
   * {@link TokenAttributesFilter}). If no filter is provided, all requests will
   * be vacuously authorized.
   */
  requiresAuth:
    | boolean
    | {
        filter?: TokenAttributesFilter;
      };
};

export type Context = EmptyObject;

/**
 * Rejects unauth-able requests (via Authorization header).
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

  const { requiresAuth } = context.options;

  if (context.options.requiresAuth) {
    await getAuthedClientToken(reqOrRequest, {
      errorBehavior: 'reject',
      filter: typeof requiresAuth === 'object' ? requiresAuth.filter : undefined
    });
  } else {
    debug('skipped authentication and authorization checks');
  }
}
