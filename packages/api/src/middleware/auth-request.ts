import { getAuthedClientToken } from '@-xun/api-strategy/auth';

import { globalDebugLogger } from 'universe+api:constant.ts';

import type { TokenAttributesFilter } from '@-xun/api-strategy/auth';
import type { EmptyObject } from 'type-fest';
import type { MiddlewareContext } from 'universe+api';

import type {
  ExportedMiddleware,
  ModernOrLegacyMiddleware
} from 'universe+api:types.ts';

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
export function makeMiddleware() {
  return async function (reqOrRequest, resOrModernContext, maybeLegacyContext) {
    const isInLegacyMode = !!maybeLegacyContext;
    debug('entered middleware runtime (mode: %O)', isInLegacyMode ? 'LEGACY' : 'MODERN');

    const context = (
      isInLegacyMode ? maybeLegacyContext : resOrModernContext
    ) as MiddlewareContext<Options, Context, ModernOrLegacyMiddleware<Options, Context>>;

    const { requiresAuth } = context.options;

    if (context.options.requiresAuth) {
      await getAuthedClientToken(reqOrRequest, {
        errorBehavior: 'reject',
        filter: typeof requiresAuth === 'object' ? requiresAuth.filter : undefined
      });
    } else {
      debug('skipped authentication and authorization checks');
    }
  } satisfies ExportedMiddleware<Options, Context>;
}
