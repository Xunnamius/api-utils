import { getEnv } from '@-xun/env';
import { getDb } from '@-xun/mongo-schema';

import { globalDebugLogger } from 'universe+api-strategy:constant.ts';

const debug = globalDebugLogger.extend('contrived');

/**
 * Returns `true` if a request should be rejected with a pseudo-error.
 *
 * Note that this is a per-serverless-function request counter and not global
 * across all Vercel virtual machines.
 */
export async function isDueForContrivedError() {
  const { REQUESTS_PER_CONTRIVED_ERROR: reqPerError } = getEnv();

  if (reqPerError) {
    const logsDb = (await getDb({ name: 'root' })).collection('request-log');
    const count = await logsDb.estimatedDocumentCount();

    debug(`${count}%${reqPerError} = %O`, count % reqPerError);

    if (count % reqPerError === 0) {
      debug('determined request is due for contrived error');
      return true;
    }
  } else {
    debug(
      `skipped contrived error check (cause: REQUESTS_PER_CONTRIVED_ERROR=${reqPerError})`
    );
  }

  return false;
}
