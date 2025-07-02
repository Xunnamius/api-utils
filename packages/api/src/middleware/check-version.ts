/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { getEnv } from '@-xun/env';
import { sendHttpNotFound } from '@-xun/respond';

import { globalDebugLogger } from 'universe+api:constant.ts';

import type { EmptyObject } from 'type-fest';

import type {
  LegacyMiddlewareContext,
  MiddlewareContext,
  ModernMiddlewareContext,
  NextApiRequestLike,
  NextApiResponseLike
} from 'universe+api';

import type { AnyMiddleware } from 'universe+api:types.ts';

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
  _reqOrRequest: NextApiRequestLike | Request,
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

  if (context.options.apiVersion !== undefined) {
    if (getEnv().DISABLED_API_VERSIONS.includes(context.options.apiVersion)) {
      debug('version check failed: endpoint is disabled');

      if (isInLegacyMode) {
        const res = resOrContext as NextApiResponseLike;
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
}
