/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { getEnv } from '@-xun/env';
import { sendHttpBadMethod } from '@-xun/respond';

import { globalDebugLogger } from 'universe+api:constant.ts';

import type { ValidHttpMethod } from '@-xun/types';
import type { EmptyObject } from 'type-fest';

import type {
  NextApiRequestLike,
  NextApiResponseLike
} from 'multiverse+shared:next-like.ts';

import type {
  AnyMiddleware,
  LegacyMiddlewareContext,
  MiddlewareContext,
  ModernMiddlewareContext
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
    debug('method check failed: unrecognized or disallowed method', method || '(none)');

    const allowHeaderValue = allowedMethods?.join(',') || '';

    if (isInLegacyMode) {
      const res = resOrContext as NextApiResponseLike;
      res.setHeader('Allow', allowHeaderValue);
      sendHttpBadMethod(res);
    } else {
      return sendHttpBadMethod({}, { headers: [['Allow', allowHeaderValue]] });
    }
  } else {
    debug(`method check succeeded: method "${method}" is allowed`);
  }
}
