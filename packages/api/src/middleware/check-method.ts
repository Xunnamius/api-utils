import { getEnv } from '@-xun/env';
import { sendHttpBadMethod } from '@-xun/respond';

import {
  isNextApiRequestLike,
  isNextApiResponseLike
} from 'multiverse+shared:next-like.ts';

import { globalDebugLogger } from 'universe+api:constant.ts';
import { ErrorMessage } from 'universe+api:error.ts';

import type { ValidHttpMethod } from '@-xun/types';
import type { EmptyObject } from 'type-fest';

import type {
  ExportedMiddleware,
  LegacyMiddleware,
  MiddlewareContext
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
 *
 * Note that this middleware is only for legacy applications that are relying on
 * `IncomingMessage` and `NextApiRequestLike` instead of a more modern
 * {@link Request}-based approach.
 */
export function makeMiddleware() {
  return async function (reqOrRequest, resOrModernContext, maybeLegacyContext) {
    debug('entered middleware runtime (mode: %O)', 'LEGACY-ONLY');

    if (
      !isNextApiRequestLike(reqOrRequest) ||
      !isNextApiResponseLike(resOrModernContext) ||
      !maybeLegacyContext
    ) {
      throw new TypeError(ErrorMessage.ModernMiddlewareApiNotSupported());
    }

    const context = maybeLegacyContext as MiddlewareContext<
      Options,
      Context,
      LegacyMiddleware<Options, Context>
    >;

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

      resOrModernContext.setHeader('Allow', allowHeaderValue);
      sendHttpBadMethod(resOrModernContext);
    } else {
      debug(`method check succeeded: method "${method}" is allowed`);
    }
  } satisfies ExportedMiddleware<Options, Context>;
}
