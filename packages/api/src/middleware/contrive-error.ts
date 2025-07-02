/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { isDueForContrivedError } from '@-xun/api-strategy/contrived';
import { sendHttpContrivedError } from '@-xun/respond';

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

  if (context.options.enableContrivedErrors) {
    if (await isDueForContrivedError()) {
      debug('contrived error check determined client IS due for contrived error');

      if (isInLegacyMode) {
        const res = resOrContext as NextApiResponseLike;
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
}
