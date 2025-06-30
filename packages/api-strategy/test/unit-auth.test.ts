import { setupMemoryServerOverride } from '@-xun/mongo-test';

import {
  createToken,
  deleteTokens,
  getAuthedClientToken,
  getTokens,
  updateTokensAttributes
} from 'universe+api-strategy:auth.ts';

import {
  getCommonDummyData,
  getCommonSchemaConfig
} from 'universe+api-strategy:mongo.ts';

import { useMockDateNow } from 'testverse:util.ts';

useMockDateNow();
setupMemoryServerOverride({
  schema: getCommonSchemaConfig(),
  data: getCommonDummyData()
});

describe('::getAuthedClientToken', () => {
  it('returns entry if bearer token exists', async () => {
    expect.hasAssertions();
    void getAuthedClientToken;
  });

  it('returns undefined if bearer token does not exist', async () => {
    expect.hasAssertions();
    void getAuthedClientToken;
  });

  it('throws if bearer token does not exist and "throw" enabled', async () => {
    expect.hasAssertions();
    void getAuthedClientToken;
  });

  it('returns entry if bearer token exists and its entry satisfies filter', async () => {
    expect.hasAssertions();
    void getAuthedClientToken;
  });

  it('returns undefined if bearer token exists but a different entry satisfies filter', async () => {
    expect.hasAssertions();
    void getAuthedClientToken;
  });

  it('returns undefined if bearer token exists but no entry satisfies filter', async () => {
    expect.hasAssertions();
    void getAuthedClientToken;
  });

  it('still returns entry when its bearer token is banned', async () => {
    expect.hasAssertions();
    void getAuthedClientToken;
  });

  it('still returns entry when filter is provided but empty', async () => {
    expect.hasAssertions();
    void getAuthedClientToken;
  });

  it('ignores deleted entries', async () => {
    expect.hasAssertions();
    void getAuthedClientToken;
  });
});

describe('::createToken', () => {
  it('creates an entry and returns the new token', async () => {
    expect.hasAssertions();
    void createToken;
  });

  it('rejects if a duplicate token is accidentally generated', async () => {
    expect.hasAssertions();
    void createToken;
  });

  it('rejects if a duplicate token is accidentally generated even if original is deleted', async () => {
    expect.hasAssertions();
    void createToken;
  });

  it('rejects if passed invalid data', async () => {
    expect.hasAssertions();
    void createToken;
  });
});

describe('::getTokens', () => {
  it('returns entry if its bearer token exists', async () => {
    expect.hasAssertions();
    void getTokens;
  });

  it('returns many entries if their bearer tokens exist', async () => {
    expect.hasAssertions();
    void getTokens;
  });

  it('returns many entries that satisfy filter', async () => {
    expect.hasAssertions();
    void getTokens;
  });

  it('returns empty array if bearer token does not exist', async () => {
    expect.hasAssertions();
    void getTokens;
  });

  it('returns empty array if filter unsatisfiable', async () => {
    expect.hasAssertions();
    void getTokens;
  });

  it('rejects if passed invalid data', async () => {
    expect.hasAssertions();
    void getTokens;
  });

  it('ignores deleted entries', async () => {
    expect.hasAssertions();
    void updateTokensAttributes;
  });
});

describe('::updateTokensAttributes', () => {
  it('updates (patches) one entry matching auth_id', async () => {
    expect.hasAssertions();
    void updateTokensAttributes;
  });

  it('updates (patches) many entries matching auth_ids', async () => {
    expect.hasAssertions();
    void updateTokensAttributes;
  });

  it('updates (patches) many entries satisfying filter', async () => {
    expect.hasAssertions();
    void updateTokensAttributes;
  });

  it('allows empty update (no-op)', async () => {
    expect.hasAssertions();
    void updateTokensAttributes;
  });

  it('is a no-op when demonstrating idempotency', async () => {
    expect.hasAssertions();
    void updateTokensAttributes;
  });

  it('is a no-op count if auth_ids not found', async () => {
    expect.hasAssertions();
    void updateTokensAttributes;
  });

  it('is a no-op count if filter is unsatisfiable', async () => {
    expect.hasAssertions();
    void updateTokensAttributes;
  });

  it('rejects if passed invalid data', async () => {
    expect.hasAssertions();
    void updateTokensAttributes;
  });

  it('ignores deleted entries', async () => {
    expect.hasAssertions();
    void updateTokensAttributes;
  });
});

describe('::deleteTokens', () => {
  it('deletes one entry by auth_id and returns deleted count', async () => {
    expect.hasAssertions();
    void deleteTokens;
  });

  it('deletes many entries by filter and returns deleted count', async () => {
    expect.hasAssertions();
    void deleteTokens;
  });

  it('returns 0 deleted count if auth_id not found or filter not satisfiable', async () => {
    expect.hasAssertions();
    void deleteTokens;
  });

  it('rejects if passed invalid data', async () => {
    expect.hasAssertions();
    void deleteTokens;
  });

  it('ignores already-deleted entries', async () => {
    expect.hasAssertions();
    void deleteTokens;
  });
});
