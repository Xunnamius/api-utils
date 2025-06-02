/**
 ** This file exports test utilities specific to this project and beyond what is
 ** exported by @-xun/jest; these can be imported using the testversal aliases.
 */

import type { WithId } from 'mongodb';

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
