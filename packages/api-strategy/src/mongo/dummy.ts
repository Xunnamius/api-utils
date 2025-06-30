import { mockDateNowMs } from '@-xun/jest';
import { safeDeepClone } from '@-xun/js';
import { generateMockSensitiveObjectId } from '@-xun/mongo-test';

import {
  BANNED_BEARER_TOKEN,
  DEV_BEARER_TOKEN,
  DUMMY_BEARER_TOKEN
} from 'universe+api-strategy:auth/well-known-tokens.ts';

import type { DummyData } from '@-xun/mongo-test';
import type { InternalAuthEntry } from 'universe+api-strategy:auth/types.ts';
import type { InternalLimitedLogEntry } from 'universe+api-strategy:limit.ts';
import type { InternalRequestLogEntry } from 'universe+api-strategy:log.ts';

/**
 * Returns data used to hydrate the well-known "root" database.
 */
export function getCommonDummyData(additionalDummyData?: DummyData): DummyData {
  return safeDeepClone({ root: dummyRootData, ...additionalDummyData });
}

/**
 * The shape of the well-known `root` database's collections and their test
 * data.
 *
 * @see `DummyData` from the "shared" package
 */
export type DummyRootData = {
  _generatedAt: number;
  auth: InternalAuthEntry[];
  'request-log': InternalRequestLogEntry[];
  'limited-log': InternalLimitedLogEntry[];
};

/**
 * Test data for the well-known `root` database.
 */
export const dummyRootData: DummyRootData = {
  _generatedAt: mockDateNowMs,
  auth: [
    // ! Must maintain order or various unit tests across projects will fail !
    {
      _id: generateMockSensitiveObjectId(),
      deleted: false,
      attributes: { owner: 'local developer', isGlobalAdmin: true },
      token: DEV_BEARER_TOKEN
    },
    {
      _id: generateMockSensitiveObjectId(),
      deleted: false,
      attributes: { owner: 'dummy owner' },
      token: DUMMY_BEARER_TOKEN
    },
    {
      _id: generateMockSensitiveObjectId(),
      deleted: false,
      attributes: { owner: 'banned dummy owner' },
      token: BANNED_BEARER_TOKEN
    }
  ],
  'request-log': Array.from({ length: 22 }).map((_, ndx) => ({
    _id: generateMockSensitiveObjectId(),
    ip: '1.2.3.4',
    header: ndx % 2 ? null : `bearer ${BANNED_BEARER_TOKEN}`,
    method: ndx % 3 ? 'GET' : 'POST',
    route: 'fake/route',
    endpoint: '/fake/:route',
    createdAt: mockDateNowMs + 10 ** 6,
    resStatusCode: 200,
    durationMs: 1234
  })),
  'limited-log': [
    // ! Must maintain order or various unit tests will fail
    {
      _id: generateMockSensitiveObjectId(),
      ip: '1.2.3.4',
      until: mockDateNowMs + 1000 * 60 * 15
    },
    {
      _id: generateMockSensitiveObjectId(),
      ip: '5.6.7.8',
      until: mockDateNowMs + 1000 * 60 * 15
    },
    {
      _id: generateMockSensitiveObjectId(),
      header: `bearer ${BANNED_BEARER_TOKEN}`,
      until: mockDateNowMs + 1000 * 60 * 60
    }
  ]
};
