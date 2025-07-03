import { getEnv } from '@-xun/env';
import { sendHttpBadMethod } from '@-xun/respond';

import { globalDebugLogger } from 'universe+api:constant.ts';

import type { ValidHttpMethod } from '@-xun/types';
import type { EmptyObject } from 'type-fest';
import type { NextApiResponseLike } from 'multiverse+shared:next-like.ts';

import type {
  ExportedMiddleware,
  MiddlewareContext,
  ModernOrLegacyMiddleware
} from 'universe+api:types.ts';

const debug = globalDebugLogger.extend('check-method');

export type Options = {
  /**
   * An array of HTTP methods this endpoint is allowed to serve.
   */
  allowedMethods?: ValidHttpMethod[];
};

export type Context = EmptyObject;

/**
 * Rejects requests that are either using a disallowed method or not using an
 * allowed method.
 */
export function makeMiddleware() {
  return async function (reqOrRequest, resOrModernContext, maybeLegacyContext) {
    const isInLegacyMode = !!maybeLegacyContext;
    debug('entered middleware runtime (mode: %O)', isInLegacyMode ? 'LEGACY' : 'MODERN');

    const context = (
      isInLegacyMode ? maybeLegacyContext : resOrModernContext
    ) as MiddlewareContext<Options, Context, ModernOrLegacyMiddleware<Options, Context>>;

    const method = reqOrRequest.method?.toUpperCase();

    debug('original method: %O', reqOrRequest.method);
    debug('used method: %O', method);

    const allowedMethods = context.options.allowedMethods?.map((m) => m.toUpperCase());

    if (
      !method ||
      // ? Already guaranteed uppercase thanks to @-xun/env
      getEnv().DISALLOWED_METHODS.includes(method) ||
      !allowedMethods?.includes(method as ValidHttpMethod)
    ) {
      debug(
        'method check failed: unrecognized or disallowed method',
        method || '(none)'
      );

      const allowHeaderValue = allowedMethods?.join(',') || '';

      if (isInLegacyMode) {
        const res = resOrModernContext as NextApiResponseLike;
        res.setHeader('Allow', allowHeaderValue);
        sendHttpBadMethod(res);
      } else {
        return sendHttpBadMethod({}, { headers: [['Allow', allowHeaderValue]] });
      }
    } else {
      debug(`method check succeeded: method "${method}" is allowed`);
    }
  } satisfies ExportedMiddleware<Options, Context>;
}
