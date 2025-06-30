import { randomUUID } from 'node:crypto';
import { performance as perf } from 'node:perf_hooks';

import { addToRequestLog } from '@-xun/log';
import { createDebugLogger } from 'rejoinder';

import type { MiddlewareContext } from '@-xun/api-glue';

const debug = createDebugLogger('next-adhesive:log-request');

export type Options = {
  // No options
};

/**
 * Logs the response to each request after it is sent (i.e. `res.end()`).
 */
export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
  context: MiddlewareContext<Options>
) {
  debug('entered middleware runtime');

  const perfUUID = randomUUID();
  perf.mark(perfUUID);

  const send = res.end;
  res.end = ((...args: Parameters<typeof res.end>) => {
    const sent = res.writableEnded;
    send(...args);

    if (!sent) {
      debug('logging request after initial call to res.end');
      // ! Note that this async function is NOT awaited!!!
      void addToRequestLog({
        req,
        res,
        endpoint: context.runtime.endpoint.descriptor,
        durationMs: Math.floor(perf.measure(randomUUID(), perfUUID).duration)
      });
    }
  }) as typeof res.end;
}
