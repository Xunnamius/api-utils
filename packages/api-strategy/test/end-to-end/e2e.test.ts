// * These tests run through the entire process of acquiring this software,
// * using its features, and dealing with its error conditions across a variety
// * of runtimes (e.g. the currently maintained node versions).
// *
// * Typically, these tests involve the use of deep mock fixtures and/or Docker
// * containers, and are built to run in GitHub Actions CI pipelines; some can
// * also be run locally.

import { toAbsolutePath, toDirname } from '@-xun/fs';
import { createDebugLogger } from 'rejoinder';

import {
  exports as packageExports,
  name as packageName
} from 'rootverse+api-strategy:package.json';

import {
  ensurePackageHasBeenBuilt,
  reconfigureJestGlobalsToSkipTestsInThisFileIfRequested
} from 'testverse:util.ts';

const TEST_IDENTIFIER = `${packageName.split('/').at(-1)!}-e2e`;
const debug = createDebugLogger({ namespace: 'api-strategy' }).extend(TEST_IDENTIFIER);
const nodeVersion = process.env.XPIPE_MATRIX_NODE_VERSION || process.version;

debug(`nodeVersion: "${nodeVersion}" (process.version=${process.version})`);

reconfigureJestGlobalsToSkipTestsInThisFileIfRequested({ it: true, test: true });

beforeAll(async () => {
  await ensurePackageHasBeenBuilt(
    toDirname(toAbsolutePath(require.resolve('rootverse+api-strategy:package.json'))),
    packageName,
    packageExports
  );
});

test.todo('this');
