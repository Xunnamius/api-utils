import { getEnv } from '@-xun/next-env';
import { sendHttpNotFound } from '@-xun/next-api-respond';
import { createDebugLogger } from 'rejoinder';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { MiddlewareContext } from '@-xun/next-api-glue';

const debug = createDebugLogger('next-adhesive:check-version');

export type Options = {
  /**
   * The version of the api this endpoint serves.
   */
  apiVersion?: string;
};

/**
 * Rejects requests to disabled versions of the API.
 */
export default async function (
  _req: NextApiRequest,
  res: NextApiResponse,
  context: MiddlewareContext<Options>
) {
  debug('entered middleware runtime');

  if (context.options.apiVersion !== undefined) {
    if (getEnv().DISABLED_API_VERSIONS.includes(context.options.apiVersion)) {
      debug('version check failed: endpoint is disabled');
      sendHttpNotFound(res);
    } else {
      debug('version check succeeded: endpoint is available');
    }
  } else {
    debug('skipped version check');
  }
}
