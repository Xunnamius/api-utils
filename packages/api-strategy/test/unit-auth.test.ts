/* eslint-disable unicorn/prevent-abbreviations */
import { randomUUID } from 'node:crypto';

import { ErrorMessage as MongoItemErrorMessage } from '@-xun/mongo-item/error';
import { setupMemoryServerOverride } from '@-xun/mongo-test';
import { ObjectId } from 'mongodb';
import { testApiHandler } from 'next-test-api-route-handler';

import { getAuthDb } from 'universe+api-strategy:auth/db.ts';

import {
  createToken,
  deleteTokens,
  DUMMY_BEARER_TOKEN,
  getAuthedClientToken,
  getTokens,
  NULL_BEARER_TOKEN,
  updateTokensAttributes
} from 'universe+api-strategy:auth.ts';

import { ErrorMessage } from 'universe+api-strategy:error.ts';
import { dummyRootData, getCommonDummyData } from 'universe+api-strategy:mongo/dummy.ts';
import { getCommonSchemaConfig } from 'universe+api-strategy:mongo/index.ts';

import {
  asMocked,
  expectExceptionsWithMatchingErrors,
  useMockDateNow
} from 'testverse:util.ts';

import type { PublicAuthEntry } from 'universe+api-strategy:auth.ts';
import type { ExpectExceptionsWithMatchingErrorsSpec as Spec } from 'testverse:util.ts';

useMockDateNow();
setupMemoryServerOverride({
  schema: getCommonSchemaConfig(),
  data: getCommonDummyData()
});

jest.mock<typeof import('node:crypto')>('node:crypto', () => {
  const crypto = jest.requireActual('node:crypto');
  return { ...crypto, randomUUID: jest.fn() };
});

const {
  _id: devId,
  token: devToken,
  attributes: devAttributes
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

const mockRandomUUID = asMocked(randomUUID);

beforeEach(() => {
  mockRandomUUID.mockReturnValue(DUMMY_BEARER_TOKEN);
});

describe('::getAuthedClientToken', () => {
  it('returns entry (across call sigs) if bearer token exists', async () => {
    expect.hasAssertions();

    // * Header string call sig
    {
      await expect(getAuthedClientToken(`bearer ${devToken}`)).resolves.toStrictEqual({
        attributes: devAttributes,
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
          req.headers.authorization = `bearer ${devToken}`;
        },
        async pagesHandler(req, res) {
          await expect(getAuthedClientToken(req)).resolves.toStrictEqual({
            attributes: devAttributes,
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
          request.headers.set('authorization', `bearer ${devToken}`);
        },
        appHandler: {
          async GET(request) {
            await expect(getAuthedClientToken(request)).resolves.toStrictEqual({
              attributes: devAttributes,
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
      getAuthedClientToken(`bearer ${devToken}`, {
        filter: { isGlobalAdmin: true }
      })
    ).resolves.toStrictEqual({
      attributes: devAttributes,
      auth_id: expect.any(String)
    });
  });

  it('returns entry if bearer token exists and its entry satisfies owner filter', async () => {
    expect.hasAssertions();

    await expect(
      getAuthedClientToken(`bearer ${devToken}`, {
        filter: { owner: devAttributes.owner }
      })
    ).resolves.toStrictEqual({
      attributes: devAttributes,
      auth_id: expect.any(String)
    });

    await expect(
      getAuthedClientToken(`bearer ${devToken}`, {
        filter: { owner: ['a', 'b', devAttributes.owner, 'c'] }
      })
    ).resolves.toStrictEqual({
      attributes: devAttributes,
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

    await expect(getAuthedClientToken(`bearer ${devToken}`)).resolves.toBeDefined();
    await expect(getAuthedClientToken(`bearer ${normieToken}`)).resolves.toBeDefined();
    await expect(getAuthedClientToken(`bearer ${bannedToken}`)).resolves.toBeDefined();

    await (await getAuthDb()).updateMany({}, { $set: { deleted: true } });

    await expect(getAuthedClientToken(`bearer ${devToken}`)).resolves.toBeUndefined();
    await expect(getAuthedClientToken(`bearer ${normieToken}`)).resolves.toBeUndefined();
    await expect(getAuthedClientToken(`bearer ${bannedToken}`)).resolves.toBeUndefined();
  });
});

describe('::createToken', () => {
  it('creates entries and returns the new tokens', async () => {
    expect.hasAssertions();

    const crypto = jest.requireActual('node:crypto');
    const draftToken1 = crypto.randomUUID() as ReturnType<typeof mockRandomUUID>;
    const draftToken2 = crypto.randomUUID() as ReturnType<typeof mockRandomUUID>;

    mockRandomUUID.mockReturnValueOnce(draftToken1);
    mockRandomUUID.mockReturnValueOnce(draftToken2);

    const authDb = await getAuthDb();

    await expect(
      authDb.countDocuments({ 'attributes.owner': 'new-owner' })
    ).resolves.toBe(0);

    await expect(
      createToken({ data: { attributes: { owner: 'new-owner' } } })
    ).resolves.toStrictEqual<PublicAuthEntry>({
      auth_id: expect.any(String),
      attributes: { owner: 'new-owner' },
      token: draftToken1
    });

    await expect(
      authDb.countDocuments({
        attributes: { owner: 'new-owner' },
        token: draftToken1
      })
    ).resolves.toBe(1);

    await expect(
      createToken({
        data: { attributes: { owner: 'new-owner', isGlobalAdmin: true } }
      })
    ).resolves.toStrictEqual<PublicAuthEntry>({
      auth_id: expect.any(String),
      attributes: { owner: 'new-owner', isGlobalAdmin: true },
      token: draftToken2
    });

    await expect(
      authDb.countDocuments({
        attributes: { owner: 'new-owner', isGlobalAdmin: true },
        token: draftToken2
      })
    ).resolves.toBe(1);

    await expect(
      authDb.countDocuments({ 'attributes.owner': 'new-owner' })
    ).resolves.toBe(2);
  });

  it('rejects if a duplicate token is accidentally generated', async () => {
    expect.hasAssertions();

    // ? We overrode the UUID generator function to always return the dummy
    // ? token, which already exists in the database, so adding a new one should
    // ? break things like how we expect:

    await expect(
      createToken({ data: { attributes: { owner: 'new-owner' } } })
    ).rejects.toMatchObject({
      message: expect.stringContaining(ErrorMessage.TokenCollision())
    });
  });

  it('rejects if a duplicate token is accidentally generated even if original is deleted', async () => {
    expect.hasAssertions();

    await expect(
      createToken({ data: { attributes: { owner: 'new-owner' } } })
    ).rejects.toMatchObject({
      message: expect.stringContaining('token collision')
    });
  });

  it('rejects if passed invalid data', async () => {
    expect.hasAssertions();

    const errors = [
      [{}, expect.stringContaining('must be an object')],
      [
        { data: { attributes: undefined } },
        expect.stringContaining('must be an object')
      ],
      [{ data: { attributes: null } }, expect.stringContaining('must be an object')],
      [{ data: { attributes: false } }, expect.stringContaining('must be an object')],
      [{ data: { attributes: true } }, expect.stringContaining('must be an object')],
      [{ data: { attributes: {} } }, expect.stringContaining('must be a string')],
      [
        {
          data: { attributes: { isGlobalAdmin: null } }
        },
        expect.stringContaining('must be a string')
      ],
      [
        { data: { attributes: { isGlobalAdmin: 1 } } },
        expect.stringContaining('must be a string')
      ],
      [
        {
          data: { attributes: { isGlobalAdmin: true } }
        },
        expect.stringContaining('must be a string')
      ],
      [
        { data: { attributes: { name: 'owner' } } },
        expect.stringContaining('must be a string')
      ],
      [
        { data: { attributes: { owner: null } } },
        expect.stringContaining('must be a string')
      ],
      [
        {
          data: {
            attributes: {
              owner: 'name',
              isGlobalAdmin: 1
            }
          }
        },
        expect.stringContaining('must be boolean')
      ],
      [
        {
          data: {
            attributes: {
              owner: 'name',
              isGlobalAdmin: null
            }
          }
        },
        expect.stringContaining('must be boolean')
      ],
      [
        {
          data: {
            attributes: {
              owner: 'name',
              isGlobalAdmin: 'true'
            }
          }
        },
        expect.stringContaining('must be boolean')
      ],
      [
        {
          data: {
            attributes: {
              owner: 'name',
              extra: 1
            }
          }
        },
        expect.stringContaining('extra must be removed')
      ]
    ] as Spec<[Parameters<typeof createToken>[0]], 'single-parameter'>;

    await expectExceptionsWithMatchingErrors(
      errors,
      (params) => createToken(...params),
      { singleParameter: true }
    );
  });
});

describe('::getTokens', () => {
  it('returns one or more entries by auth_ids', async () => {
    expect.hasAssertions();

    await expect(
      getTokens({
        auth_ids: [normieId]
      })
    ).resolves.toStrictEqual<PublicAuthEntry[]>([
      {
        auth_id: expect.any(String),
        attributes: normieAttributes,
        token: normieToken
      }
    ]);

    await expect(
      getTokens({
        auth_ids: [devId, normieId, bannedId]
      })
    ).resolves.toStrictEqual<PublicAuthEntry[]>([
      { auth_id: expect.any(String), attributes: devAttributes, token: devToken },
      {
        auth_id: expect.any(String),
        attributes: normieAttributes,
        token: normieToken
      },
      {
        auth_id: expect.any(String),
        attributes: bannedAttributes,
        token: bannedToken
      }
    ]);
  });

  it('ignores auth_ids that do not exist', async () => {
    expect.hasAssertions();

    await expect(
      getTokens({
        auth_ids: [
          devId,
          ObjectId.createFromTime(10),
          normieId,
          ObjectId.createFromTime(20),
          bannedId,
          ObjectId.createFromTime(30)
        ]
      })
    ).resolves.toStrictEqual<PublicAuthEntry[]>([
      { auth_id: expect.any(String), attributes: devAttributes, token: devToken },
      {
        auth_id: expect.any(String),
        attributes: normieAttributes,
        token: normieToken
      },
      {
        auth_id: expect.any(String),
        attributes: bannedAttributes,
        token: bannedToken
      }
    ]);
  });

  it('returns many entries that satisfy filter', async () => {
    expect.hasAssertions();

    await expect(
      getTokens({
        filter: { owner: [bannedAttributes.owner] }
      })
    ).resolves.toStrictEqual<PublicAuthEntry[]>([
      {
        auth_id: expect.any(String),
        attributes: bannedAttributes,
        token: bannedToken
      }
    ]);

    await expect(
      getTokens({
        filter: { owner: [devAttributes.owner, bannedAttributes.owner] }
      })
    ).resolves.toStrictEqual<PublicAuthEntry[]>([
      { auth_id: expect.any(String), attributes: devAttributes, token: devToken },
      {
        auth_id: expect.any(String),
        attributes: bannedAttributes,
        token: bannedToken
      }
    ]);
  });

  it('returns empty array if auth_ids do not exist', async () => {
    expect.hasAssertions();

    await expect(
      getTokens({
        auth_ids: [
          ObjectId.createFromTime(10),
          ObjectId.createFromTime(20),
          ObjectId.createFromTime(30)
        ]
      })
    ).resolves.toBeEmpty();
  });

  it('returns empty array if filter unsatisfiable', async () => {
    expect.hasAssertions();

    await expect(
      getTokens({
        filter: { owner: 'does-not-exist' }
      })
    ).resolves.toBeEmpty();
  });

  it('rejects if passed invalid data', async () => {
    expect.hasAssertions();

    await expect(
      // @ts-expect-error: testing badness
      getTokens({
        auth_ids: { bad: true }
      })
    ).rejects.toThrow(MongoItemErrorMessage.InvalidItem({ bad: true }, 'ObjectId'));

    await expect(
      getTokens({
        filter: { badness: true }
      })
    ).rejects.toThrow('badness must be removed');
  });

  it('ignores deleted entries', async () => {
    expect.hasAssertions();

    await (await getAuthDb()).updateMany({}, { $set: { deleted: true } });

    await expect(
      getTokens({
        auth_ids: [devId, normieId, bannedId]
      })
    ).resolves.toBeEmpty();
  });
});

describe('::updateTokensAttributes', () => {
  it('updates (patches) one or more entries matching auth_ids and returns updated count', async () => {
    expect.hasAssertions();

    await expect(
      updateTokensAttributes({ auth_ids: [devId], data: { owner: 'new-owner' } })
    ).resolves.toBe(1);

    await expect(
      updateTokensAttributes({ auth_ids: [devId], data: { owner: 'new-owner' } })
    ).resolves.toBe(0);

    await expect(
      updateTokensAttributes({
        auth_ids: [devId, normieId, bannedId],
        data: { owner: 'new-owner' }
      })
    ).resolves.toBe(2);

    await expect(
      getTokens({
        auth_ids: [devId, normieId, bannedId]
      })
    ).resolves.toStrictEqual([
      expect.objectContaining({ attributes: { ...devAttributes, owner: 'new-owner' } }),
      expect.objectContaining({
        attributes: { ...normieAttributes, owner: 'new-owner' }
      }),
      expect.objectContaining({
        attributes: { ...bannedAttributes, owner: 'new-owner' }
      })
    ]);
  });

  it('updates (patches) many entries satisfying filter and returns updated count', async () => {
    expect.hasAssertions();

    await expect(
      updateTokensAttributes({
        filter: { owner: devAttributes.owner },
        data: { owner: 'new-owner' }
      })
    ).resolves.toBe(1);

    await expect(
      updateTokensAttributes({
        filter: { owner: devAttributes.owner },
        data: { owner: 'new-owner' }
      })
    ).resolves.toBe(0);

    await expect(
      updateTokensAttributes({
        filter: {
          owner: [devAttributes.owner, normieAttributes.owner, bannedAttributes.owner]
        },
        data: { owner: 'new-owner' }
      })
    ).resolves.toBe(2);
  });

  it('allows empty update (no-op, returns 0 updated count)', async () => {
    expect.hasAssertions();

    await expect(
      updateTokensAttributes({
        filter: { owner: devAttributes.owner },
        data: {}
      })
    ).resolves.toBe(0);
  });

  it('is a no-op when demonstrating idempotency', async () => {
    expect.hasAssertions();

    await expect(
      updateTokensAttributes({
        filter: { owner: devAttributes.owner },
        data: devAttributes
      })
    ).resolves.toBe(0);
  });

  it('is a no-op count if auth_ids not found', async () => {
    expect.hasAssertions();

    await expect(
      updateTokensAttributes({
        auth_ids: [ObjectId.createFromTime(10)],
        data: devAttributes
      })
    ).resolves.toBe(0);
  });

  it('is a no-op count if filter is unsatisfiable', async () => {
    expect.hasAssertions();

    await expect(
      updateTokensAttributes({
        filter: { owner: 'fake-owner' },
        data: devAttributes
      })
    ).resolves.toBe(0);
  });

  it('rejects if passed invalid data', async () => {
    expect.hasAssertions();

    await expect(
      updateTokensAttributes({
        filter: { badBad: 'not-good' },
        data: devAttributes
      })
    ).rejects.toThrow('badBad must be removed');
  });

  it('ignores deleted entries', async () => {
    expect.hasAssertions();

    await (await getAuthDb()).updateMany({}, { $set: { deleted: true } });

    await expect(
      updateTokensAttributes({
        filter: { owner: devAttributes.owner },
        data: { owner: 'something-new' }
      })
    ).resolves.toBe(0);
  });
});

describe('::deleteTokens', () => {
  it('deletes one or many entry by auth_ids and returns deleted count', async () => {
    expect.hasAssertions();

    await expect(deleteTokens({ auth_ids: [devId] })).resolves.toBe(1);
    await expect(deleteTokens({ auth_ids: [devId] })).resolves.toBe(0);

    await expect(deleteTokens({ auth_ids: [devId, normieId, bannedId] })).resolves.toBe(
      2
    );

    await expect(deleteTokens({ auth_ids: [devId, normieId, bannedId] })).resolves.toBe(
      0
    );

    await expect(
      getTokens({
        auth_ids: [devId, normieId, bannedId]
      })
    ).resolves.toBeEmpty();
  });

  it('deletes many entries by filter and returns deleted count', async () => {
    expect.hasAssertions();

    await expect(
      deleteTokens({
        filter: {
          owner: [devAttributes.owner, normieAttributes.owner, bannedAttributes.owner]
        }
      })
    ).resolves.toBe(3);

    await expect(
      deleteTokens({
        filter: {
          owner: [devAttributes.owner, normieAttributes.owner, bannedAttributes.owner]
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
    ).rejects.toThrow(MongoItemErrorMessage.InvalidItem('fake-1', 'ObjectId'));
  });

  it('ignores already-deleted entries', async () => {
    expect.hasAssertions();

    await (await getAuthDb()).updateMany({}, { $set: { deleted: true } });

    await expect(
      deleteTokens({
        filter: {
          owner: [devAttributes.owner, normieAttributes.owner, bannedAttributes.owner]
        }
      })
    ).resolves.toBe(0);
  });
});
