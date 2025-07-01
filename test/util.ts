/**
 ** This file exports test utilities specific to this project and beyond what is
 ** exported by @-xun/jest; these can be imported using the testversal aliases.
 */

import { disableLoggers, enableLoggers, LoggerType } from 'rejoinder';

import type { withMockedEnv } from '@-xun/jest';
import type { WithId } from 'mongodb';

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
// TODO: use the latest enable/disable api to only disable previously enabled
export async function withDebugEnabled(fn: Parameters<typeof withMockedEnv>[0]) {
  enableLoggers({ type: LoggerType.DebugOnly });

  try {
    await fn();
  } finally {
    disableLoggers({ type: LoggerType.DebugOnly });
  }
}
