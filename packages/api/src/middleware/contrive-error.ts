import { isDueForContrivedError } from '@-xun/api-strategy/contrived';
import { sendHttpContrivedError } from '@-xun/respond';

import { globalDebugLogger } from 'universe+api:constant.ts';

import type { EmptyObject } from 'type-fest';
import type { MiddlewareContext, NextApiResponseLike } from 'universe+api';

import type {
  ExportedMiddleware,
  ModernOrLegacyMiddleware
} from 'universe+api:types.ts';

const debug = globalDebugLogger.extend('contrive-error');

export type Options = {
  /**
   * If `true`, every Nth request will fail with a contrived error.
   *
   * @default false
   */
  enableContrivedErrors?: boolean;
};

export type Context = EmptyObject;

/**
 * Rejects every Nth request with a dummy error (see .env.example).
 */
export function makeMiddleware() {
  return async function (_reqOrRequest, resOrModernContext, maybeLegacyContext) {
    const isInLegacyMode = !!maybeLegacyContext;
    debug('entered middleware runtime (mode: %O)', isInLegacyMode ? 'LEGACY' : 'MODERN');

    const context = (
      isInLegacyMode ? maybeLegacyContext : resOrModernContext
    ) as MiddlewareContext<Options, Context, ModernOrLegacyMiddleware<Options, Context>>;

    if (context.options.enableContrivedErrors) {
      if (await isDueForContrivedError()) {
        debug('contrived error check determined client IS due for contrived error');

        if (isInLegacyMode) {
          const res = resOrModernContext as NextApiResponseLike;
          sendHttpContrivedError(res);
        } else {
          return sendHttpContrivedError();
        }
      } else {
        debug('contrived error check determined client IS NOT due for contrived error');
      }
    } else {
      debug('skipped contrived error check');
    }
  } satisfies ExportedMiddleware<Options, Context>;
}
