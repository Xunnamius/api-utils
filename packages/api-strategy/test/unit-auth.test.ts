import { setupMemoryServerOverride } from '@-xun/mongo-test';
import { ObjectId } from 'mongodb';
import { testApiHandler } from 'next-test-api-route-handler';

import { getAuthDb } from 'universe+api-strategy:auth/db.ts';

import {
  createToken,
  deleteTokens,
  getAuthedClientToken,
  getTokens,
  NULL_BEARER_TOKEN,
  updateTokensAttributes
} from 'universe+api-strategy:auth.ts';

import { ErrorMessage } from 'universe+api-strategy:error.ts';
import { dummyRootData, getCommonDummyData } from 'universe+api-strategy:mongo/dummy.ts';
import { getCommonSchemaConfig } from 'universe+api-strategy:mongo/index.ts';

import { useMockDateNow } from 'testverse:util.ts';

useMockDateNow();
setupMemoryServerOverride({
  schema: getCommonSchemaConfig(),
  data: getCommonDummyData()
});

const {
  _id: developmentId,
  token: developmentToken,
  attributes: developmentAttributes
} = dummyRootData.auth[0]!;
const {
  _id: normieId,
  token: normieToken,
  attributes: normieAttributes
} = dummyRootData.auth[1]!;
const {
  _id: bannedId,
  token: bannedToken,
  attributes: bannedAttributes
} = dummyRootData.auth[2]!;

describe('::getAuthedClientToken', () => {
  it('returns entry (across call sigs) if bearer token exists', async () => {
    expect.hasAssertions();

    // * Header string call sig
    {
      await expect(
        getAuthedClientToken(`bearer ${developmentToken}`)
      ).resolves.toStrictEqual({
        attributes: developmentAttributes,
        auth_id: expect.any(String)
      });

      await expect(getAuthedClientToken(`bearer ${normieToken}`)).resolves.toStrictEqual(
        {
          attributes: normieAttributes,
          auth_id: expect.any(String)
        }
      );
    }

    // * Legacy Next-like call sig
    {
      await testApiHandler({
        rejectOnHandlerError: true,
        requestPatcher(req) {
          req.headers.authorization = `bearer ${developmentToken}`;
        },
        async pagesHandler(req, res) {
          await expect(getAuthedClientToken(req)).resolves.toStrictEqual({
            attributes: developmentAttributes,
            auth_id: expect.any(String)
          });

          res.status(200).send('OK');
        },
        test: async ({ fetch }) => void (await fetch())
      });

      await testApiHandler({
        rejectOnHandlerError: true,
        requestPatcher(req) {
          req.headers.authorization = `bearer ${normieToken}`;
        },
        async pagesHandler(req, res) {
          await expect(getAuthedClientToken(req)).resolves.toStrictEqual({
            attributes: normieAttributes,
            auth_id: expect.any(String)
          });

          res.status(200).send('OK');
        },
        test: async ({ fetch }) => void (await fetch())
      });
    }

    // * Modern web API call sig
    {
      await testApiHandler({
        rejectOnHandlerError: true,
        requestPatcher(request) {
          request.headers.set('authorization', `bearer ${developmentToken}`);
        },
        appHandler: {
          async GET(request) {
            await expect(getAuthedClientToken(request)).resolves.toStrictEqual({
              attributes: developmentAttributes,
              auth_id: expect.any(String)
            });

            return new Response('OK');
          }
        },
        test: async ({ fetch }) => void (await fetch())
      });

      await testApiHandler({
        rejectOnHandlerError: true,
        requestPatcher(request) {
          request.headers.set('authorization', `bearer ${normieToken}`);
        },
        appHandler: {
          async GET(request) {
            await expect(getAuthedClientToken(request)).resolves.toStrictEqual({
              attributes: normieAttributes,
              auth_id: expect.any(String)
            });

            return new Response('OK');
          }
        },
        test: async ({ fetch }) => void (await fetch())
      });
    }
  });

  it('returns (across call sigs) undefined if bearer token does not exist', async () => {
    expect.hasAssertions();

    // * Header string call sig
    await expect(
      getAuthedClientToken(`bearer ${NULL_BEARER_TOKEN}`)
    ).resolves.toBeUndefined();

    // * Legacy Next-like call sig
    await testApiHandler({
      rejectOnHandlerError: true,
      requestPatcher(req) {
        req.headers.authorization = `bearer ${NULL_BEARER_TOKEN}`;
      },
      async pagesHandler(req, res) {
        await expect(getAuthedClientToken(req)).resolves.toBeUndefined();
        res.status(200).send('OK');
      },
      test: async ({ fetch }) => void (await fetch())
    });

    // * Modern web API call sig
    await testApiHandler({
      rejectOnHandlerError: true,
      requestPatcher(request) {
        request.headers.set('authorization', `bearer ${NULL_BEARER_TOKEN}`);
      },
      appHandler: {
        async GET(request) {
          await expect(getAuthedClientToken(request)).resolves.toBeUndefined();
          return new Response('OK');
        }
      },
      test: async ({ fetch }) => void (await fetch())
    });
  });

  it('rejects (across call sigs) if bearer token is wrong and "errorBehavior" is set to "reject"', async () => {
    expect.hasAssertions();

    // * Header string call sig
    await expect(
      getAuthedClientToken(`bearer ${NULL_BEARER_TOKEN}`, { errorBehavior: 'reject' })
    ).rejects.toThrow(ErrorMessage.AuthAttemptFailed());

    // * Legacy Next-like call sig
    await testApiHandler({
      rejectOnHandlerError: true,
      requestPatcher(req) {
        req.headers.authorization = `bearer ${NULL_BEARER_TOKEN}`;
      },
      async pagesHandler(req, res) {
        await expect(
          getAuthedClientToken(req, { errorBehavior: 'reject' })
        ).rejects.toThrow(ErrorMessage.AuthAttemptFailed());
        res.status(200).send('OK');
      },
      test: async ({ fetch }) => void (await fetch())
    });

    // * Modern web API call sig
    await testApiHandler({
      rejectOnHandlerError: true,
      requestPatcher(request) {
        request.headers.set('authorization', `bearer ${NULL_BEARER_TOKEN}`);
      },
      appHandler: {
        async GET(request) {
          await expect(
            getAuthedClientToken(request, { errorBehavior: 'reject' })
          ).rejects.toThrow(ErrorMessage.AuthAttemptFailed());
          return new Response('OK');
        }
      },
      test: async ({ fetch }) => void (await fetch())
    });
  });

  it('rejects (across call sigs) if bearer token does not exist and "errorBehavior" is set to "reject"', async () => {
    expect.hasAssertions();

    // * Header string call sig
    await expect(
      getAuthedClientToken(`bearer`, { errorBehavior: 'reject' })
    ).rejects.toThrow(ErrorMessage.AuthAttemptFailed());

    await expect(getAuthedClientToken('', { errorBehavior: 'reject' })).rejects.toThrow(
      ErrorMessage.AuthAttemptFailed()
    );

    // * Legacy Next-like call sig
    await testApiHandler({
      rejectOnHandlerError: true,
      async pagesHandler(req, res) {
        await expect(
          getAuthedClientToken(req, { errorBehavior: 'reject' })
        ).rejects.toThrow(ErrorMessage.AuthAttemptFailed());
        res.status(200).send('OK');
      },
      test: async ({ fetch }) => void (await fetch())
    });

    // * Modern web API call sig
    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: {
        async GET(request) {
          await expect(
            getAuthedClientToken(request, { errorBehavior: 'reject' })
          ).rejects.toThrow(ErrorMessage.AuthAttemptFailed());
          return new Response('OK');
        }
      },
      test: async ({ fetch }) => void (await fetch())
    });
  });

  it('returns entry if bearer token exists and its entry satisfies isGlobalAdmin filter', async () => {
    expect.hasAssertions();

    await expect(
      getAuthedClientToken(`bearer ${developmentToken}`, {
        filter: { isGlobalAdmin: true }
      })
    ).resolves.toStrictEqual({
      attributes: developmentAttributes,
      auth_id: expect.any(String)
    });
  });

  it('returns entry if bearer token exists and its entry satisfies owner filter', async () => {
    expect.hasAssertions();

    await expect(
      getAuthedClientToken(`bearer ${developmentToken}`, {
        filter: { owner: developmentAttributes.owner }
      })
    ).resolves.toStrictEqual({
      attributes: developmentAttributes,
      auth_id: expect.any(String)
    });

    await expect(
      getAuthedClientToken(`bearer ${developmentToken}`, {
        filter: { owner: ['a', 'b', developmentAttributes.owner, 'c'] }
      })
    ).resolves.toStrictEqual({
      attributes: developmentAttributes,
      auth_id: expect.any(String)
    });
  });

  it('returns entry if matching entry exists with no isGlobalAdmin attribute while filtering for "isGlobalAdmin: false"', async () => {
    expect.hasAssertions();

    await expect(
      getAuthedClientToken(`bearer ${normieToken}`, { filter: { isGlobalAdmin: false } })
    ).resolves.toStrictEqual({
      attributes: normieAttributes,
      auth_id: expect.any(String)
    });
  });

  it('returns undefined if bearer token exists but a different entry satisfies isGlobalAdmin filter', async () => {
    expect.hasAssertions();

    await expect(
      getAuthedClientToken(`bearer ${normieToken}`, { filter: { isGlobalAdmin: true } })
    ).resolves.toBeUndefined();
  });

  it('returns undefined if bearer token exists but no entry satisfies owner filter', async () => {
    expect.hasAssertions();

    await expect(
      getAuthedClientToken(`bearer ${normieToken}`, {
        filter: { owner: 'does-not-exist' }
      })
    ).resolves.toBeUndefined();

    await expect(
      getAuthedClientToken(`bearer ${normieToken}`, {
        filter: { owner: ['a', 'b', 'c'] }
      })
    ).resolves.toBeUndefined();
  });

  it('still returns entry when its bearer token is banned', async () => {
    expect.hasAssertions();

    await expect(getAuthedClientToken(`bearer ${bannedToken}`)).resolves.toStrictEqual({
      attributes: bannedAttributes,
      auth_id: expect.any(String)
    });
  });

  it('still returns entry when filter is provided but empty', async () => {
    expect.hasAssertions();

    await expect(
      getAuthedClientToken(`bearer ${bannedToken}`, {})
    ).resolves.toStrictEqual({
      attributes: bannedAttributes,
      auth_id: expect.any(String)
    });
  });

  it('ignores deleted entries', async () => {
    expect.hasAssertions();

    await expect(
      getAuthedClientToken(`bearer ${developmentToken}`)
    ).resolves.toBeDefined();
    await expect(getAuthedClientToken(`bearer ${normieToken}`)).resolves.toBeDefined();
    await expect(getAuthedClientToken(`bearer ${bannedToken}`)).resolves.toBeDefined();

    await (await getAuthDb()).updateMany({}, { $set: { deleted: true } });

    await expect(
      getAuthedClientToken(`bearer ${developmentToken}`)
    ).resolves.toBeUndefined();
    await expect(getAuthedClientToken(`bearer ${normieToken}`)).resolves.toBeUndefined();
    await expect(getAuthedClientToken(`bearer ${bannedToken}`)).resolves.toBeUndefined();
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
  it('deletes one or many entry by auth_ids and returns deleted count', async () => {
    expect.hasAssertions();

    await expect(deleteTokens({ auth_ids: [developmentId] })).resolves.toBe(1);
    await expect(deleteTokens({ auth_ids: [developmentId] })).resolves.toBe(0);

    await expect(
      deleteTokens({ auth_ids: [developmentId, normieId, bannedId] })
    ).resolves.toBe(2);

    await expect(
      deleteTokens({ auth_ids: [developmentId, normieId, bannedId] })
    ).resolves.toBe(0);
  });

  it('deletes many entries by filter and returns deleted count', async () => {
    expect.hasAssertions();

    await expect(
      deleteTokens({
        filter: {
          owner: [
            developmentAttributes.owner,
            normieAttributes.owner,
            bannedAttributes.owner
          ]
        }
      })
    ).resolves.toBe(3);

    await expect(
      deleteTokens({
        filter: {
          owner: [
            developmentAttributes.owner,
            normieAttributes.owner,
            bannedAttributes.owner
          ]
        }
      })
    ).resolves.toBe(0);
  });

  it('returns 0 deleted count if auth_id not found or filter not satisfiable', async () => {
    expect.hasAssertions();

    await expect(
      deleteTokens({
        auth_ids: [ObjectId.createFromTime(10), ObjectId.createFromTime(20)]
      })
    ).resolves.toBe(0);
  });

  it('rejects if passed invalid data', async () => {
    expect.hasAssertions();

    await expect(
      deleteTokens({
        auth_ids: ['fake-1', 'fake-2']
      })
    ).rejects.toThrow('invalid');
  });

  it('ignores already-deleted entries', async () => {
    expect.hasAssertions();
  });
});
