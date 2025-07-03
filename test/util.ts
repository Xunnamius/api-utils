/**
 ** This file exports test utilities specific to this project and beyond what is
 ** exported by @-xun/jest; these can be imported using the testversal aliases.
 */

import { disableLoggers, enableLoggers, LoggerType } from 'rejoinder';

import { defaultLegacyPageConfig } from 'universe+api';

import type { withMockedEnv } from '@-xun/jest';
import type { WithId } from 'mongodb';
import type { LegacyApiHandler } from 'universe+api';

import type {
  NextApiRequestLike,
  NextApiResponseLike,
  PageConfigLike
} from 'universe+shared:next-like.ts';

export * from '@-xun/jest';

// ? These will always come from @-xun/symbiote and @-xun/jest (transitively)
// {@symbiote/notInvalid
//   - @-xun/jest
//   - @-xun/test-mock-argv
//   - @-xun/test-mock-exit
//   - @-xun/test-mock-import
//   - @-xun/test-mock-env
//   - @-xun/test-mock-fixture
//   - @-xun/test-mock-output
// }

export * from '@-xun/jest';

/**
 * A sort predicate meant to be used with {@link Array.prototype.sort} when
 * ordering items by their `ObjectId`. In the majority of cases, the result
 * should be the same as what MongoDb would return with `{ sort: { _id: 1 }}`).
 */
export function objectIdPseudoSortPredicate(order: 'ascending' | 'descending') {
  return (a: WithId<unknown>, b: WithId<unknown>) => {
    const [first, second] = order === 'ascending' ? [a, b] : [b, a];
    return (
      Number.parseInt(first._id.toString(), 16) -
      Number.parseInt(second._id.toString(), 16)
    );
  };
}

/**
 * Enable all rejoinder's debug loggers.
 *
 * Use this function when you're UNWISELY relying on debug output to test
 * functionality.
 *
 * **That is: don't delete/unwrap this when you see it!**
 */
// TODO: Use the latest enable/disable api to only disable previously enabled.
// TODO: Also, consider adding this to @-xun/jest (with warnings about badness)
export async function withDebugEnabled(fn: Parameters<typeof withMockedEnv>[0]) {
  enableLoggers({ type: LoggerType.DebugOnly });

  try {
    await fn();
  } finally {
    disableLoggers({ type: LoggerType.DebugOnly });
  }
}

/**
 * A mock legacy Next.js API handler that sends a `ServerResponse` with an empty
 * object body and 200 status code.
 */
export const legacyNoopHandler = async (
  _req: NextApiRequestLike,
  res: NextApiResponseLike
) => {
  res.status(200).send({});
};

/**
 * A mock modern handler that sends a {@link Reponse} with an empty object body
 * and 200 status code.
 */
export const modernNoopHandler = async (_request: Request) => {
  return Response.json({}, { status: 200 });
};

/**
 * This function wraps a legacy or modern handler function so that it provides
 * the default (or a custom) API configuration object along with its
 * implementation.
 */
export const withLegacyConfig = (handler: LegacyApiHandler, config?: PageConfigLike) => {
  const api: LegacyApiHandler & { config: PageConfigLike } = (...args) =>
    handler(...args);
  api.config = config || defaultLegacyPageConfig;
  return api;
};
