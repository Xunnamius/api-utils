import { randomUUID } from 'node:crypto';
import { performance as perf } from 'node:perf_hooks';

import { addToRequestLog } from '@-xun/api-strategy/log';

import { globalDebugLogger } from 'universe+api:constant.ts';

import type { EmptyObject } from 'type-fest';
import type { MiddlewareContext, ModernMiddlewareContext } from 'universe+api';

import type {
  ExportedMiddleware,
  ModernOrLegacyMiddleware
} from 'universe+api:types.ts';

const debug = globalDebugLogger.extend('log-request');

export type Options = EmptyObject;

export type Context = EmptyObject;

/**
 * Logs the response to each request after it is sent (i.e. `res.end()`).
 */
export function makeMiddleware() {
  return async function (_reqOrRequest, resOrModernContext, maybeLegacyContext) {
    const isInLegacyMode = !!maybeLegacyContext;
    debug('entered middleware runtime (mode: %O)', isInLegacyMode ? 'LEGACY' : 'MODERN');

    const context = (
      isInLegacyMode ? maybeLegacyContext : resOrModernContext
    ) as MiddlewareContext<Options, Context, ModernOrLegacyMiddleware<Options, Context>>;

    debug('began tracking performance data');

    const perfUUID = randomUUID();
    // TODO: might need to use more generic libs if we're on CF Workers
    perf.mark(perfUUID);

    if (isInLegacyMode) {
      maybeLegacyContext.runtime.doAfterSent(async (req, res) => {
        debug('logging req, res, and performance data');

        await addToRequestLog({
          req,
          res,
          endpoint: context.runtime.endpoint.descriptor,
          durationMs: Math.floor(perf.measure(randomUUID(), perfUUID).duration)
        });
      });
    } else {
      const context = resOrModernContext as ModernMiddlewareContext<Options, Context>;
      context.runtime.doAfterSent(async (request, { runtime: { response } }) => {
        debug('logging request, response, and performance data');

        await addToRequestLog({
          request,
          response,
          endpoint: context.runtime.endpoint.descriptor,
          durationMs: Math.floor(perf.measure(randomUUID(), perfUUID).duration)
        });
      });
    }
  } satisfies ExportedMiddleware<Options, Context>;
}
