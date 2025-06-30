import { isDueForContrivedError } from '@-xun/contrived';
import { sendHttpContrivedError } from '@-xun/respond';
import { createDebugLogger } from 'rejoinder';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { MiddlewareContext } from '@-xun/api-glue';

const debug = createDebugLogger('next-adhesive:contrive-error');

export type Options = {
  /**
   * If `true`, every Nth request will fail with a contrived error.
   *
   * @default false
   */
  enableContrivedErrors?: boolean;
};

/**
 * Rejects every Nth request with a dummy error (see .env.example).
 */
export default async function (
  _req: NextApiRequest,
  res: NextApiResponse,
  context: MiddlewareContext<Options>
) {
  debug('entered middleware runtime');

  if (context.options.enableContrivedErrors) {
    if (await isDueForContrivedError()) {
      debug('contrived error check determined client IS due for contrived error');
      sendHttpContrivedError(res);
    } else {
      debug('contrived error check determined client IS NOT due for contrived error');
    }
  } else {
    debug('skipped contrived error check');
  }
}
