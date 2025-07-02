/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */

import { randomUUID } from 'node:crypto';
import { performance as perf } from 'node:perf_hooks';

import { addToRequestLog } from '@-xun/api-strategy/log';

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

const debug = globalDebugLogger.extend('log-request');

export type Options = EmptyObject;

export type Context = EmptyObject;

/**
 * Logs the response to each request after it is sent (i.e. `res.end()`).
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

  debug('began tracking performance data');

  const perfUUID = randomUUID();
  // TODO: might need to use more generic libs if we're on CF Workers
  perf.mark(perfUUID);

  if (isInLegacyMode) {
    maybeContext.runtime.doAfterSent(async (req, res) => {
      debug('logging req, res, and performance data');

      await addToRequestLog({
        req,
        res,
        endpoint: context.runtime.endpoint.descriptor,
        durationMs: Math.floor(perf.measure(randomUUID(), perfUUID).duration)
      });
    });
  } else {
    const context = resOrContext as ModernMiddlewareContext<Options, Context>;
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
}
