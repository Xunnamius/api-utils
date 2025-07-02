/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { isClientRateLimited } from '@-xun/api-strategy/limit';
import { getEnv } from '@-xun/env';
import { sendHttpRateLimited, sendHttpUnauthorized } from '@-xun/respond';

import { globalDebugLogger } from 'universe+api:constant.ts';
import { ErrorMessage } from 'universe+api:error.ts';

import type { EmptyObject } from 'type-fest';

import type {
  LegacyMiddlewareContext,
  ModernMiddlewareContext,
  NextApiRequestLike,
  NextApiResponseLike
} from 'universe+api';

const debug = globalDebugLogger.extend('enforce-limits');

export type Options = EmptyObject;

export type Context = EmptyObject;

/**
 * Rejects requests from clients that have sent too many previous requests.
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

  if (getEnv().LOCKOUT_ALL_CLIENTS) {
    debug('rate-limit check failed: all clients locked out');

    if (isInLegacyMode) {
      const res = resOrContext as NextApiResponseLike;
      sendHttpUnauthorized(res, {
        error: ErrorMessage.AllClientsLockedOut()
      });
    } else {
      return sendHttpUnauthorized({
        error: ErrorMessage.AllClientsLockedOut()
      });
    }
  } else if (getEnv().IGNORE_RATE_LIMITS) {
    debug('skipped rate-limit check');
  } else {
    const { isLimited, retryAfter } = await isClientRateLimited(reqOrRequest);

    if (isLimited) {
      const retryTimeMs = Math.ceil(retryAfter / 1000);
      debug('rate-limit check failed: client is rate-limited until %O', retryTimeMs);

      if (isInLegacyMode) {
        const res = resOrContext as NextApiResponseLike;

        res.setHeader('Retry-After', retryTimeMs);
        sendHttpRateLimited(res, { retryAfter });
      } else {
        return sendHttpRateLimited(
          { retryAfter },
          { headers: [['Retry-After', retryTimeMs.toString()]] }
        );
      }
    }

    debug('rate-limit check succeeded: client not rate-limited');
  }
}
