import { getEnv } from '@-xun/env';
import { sendHttpNotFound } from '@-xun/respond';

import { globalDebugLogger } from 'universe+api:constant.ts';

import type { EmptyObject } from 'type-fest';
import type { MiddlewareContext, NextApiResponseLike } from 'universe+api';

import type {
  ExportedMiddleware,
  ModernOrLegacyMiddleware
} from 'universe+api:types.ts';

const debug = globalDebugLogger.extend('check-version');

export type Options = {
  /**
   * The version of the api this endpoint serves.
   */
  apiVersion?: string;
};

export type Context = EmptyObject;

/**
 * Rejects requests to disabled versions of the API.
 */
export function makeMiddleware() {
  return async function (_reqOrRequest, resOrModernContext, maybeLegacyContext) {
    const isInLegacyMode = !!maybeLegacyContext;
    debug('entered middleware runtime (mode: %O)', isInLegacyMode ? 'LEGACY' : 'MODERN');

    const context = (
      isInLegacyMode ? maybeLegacyContext : resOrModernContext
    ) as MiddlewareContext<Options, Context, ModernOrLegacyMiddleware<Options, Context>>;

    if (context.options.apiVersion !== undefined) {
      if (getEnv().DISABLED_API_VERSIONS.includes(context.options.apiVersion)) {
        debug('version check failed: endpoint is disabled');

        if (isInLegacyMode) {
          const res = resOrModernContext as NextApiResponseLike;
          sendHttpNotFound(res);
        } else {
          return sendHttpNotFound();
        }
      } else {
        debug('version check succeeded: endpoint is available');
      }
    } else {
      debug('skipped version check');
    }
  } satisfies ExportedMiddleware<Options, Context>;
}
