import { getDb } from '@-xun/mongo-schema';
import { setupMemoryServerOverride } from '@-xun/mongo-test';

import { BANNED_BEARER_TOKEN } from 'universe+api-strategy:auth.ts';

import {
  getAllRateLimits,
  isClientRateLimited,
  removeRateLimit
} from 'universe+api-strategy:limit.ts';

import { dummyRootData, getCommonDummyData } from 'universe+api-strategy:mongo/dummy.ts';
import { getCommonSchemaConfig } from 'universe+api-strategy:mongo/index.ts';

import { useMockDateNow } from 'testverse:util.ts';

import type { NextApiRequestLike } from 'multiverse+shared:next-like.ts';
import type { InternalLimitedLogEntry } from 'universe+api-strategy:limit.ts';

useMockDateNow();
setupMemoryServerOverride({
  schema: getCommonSchemaConfig(),
  data: getCommonDummyData()
});

describe('::isClientRateLimited', () => {
  it('returns true if header (case-insensitive, not including ip) are rate limited', async () => {
    expect.hasAssertions();

    const req1 = await isClientRateLimited({
      headers: { 'x-forwarded-for': '1.2.3.4' },
      method: 'POST',
      url: '/api/route/path1'
    } as unknown as NextApiRequestLike);

    const req2 = await isClientRateLimited({
      headers: {
        'x-forwarded-for': '8.8.8.8',
        // ? Should work with different cases too
        authorization: `BEARER ${BANNED_BEARER_TOKEN}`
      },
      method: 'GET',
      url: '/api/route/path2'
    } as unknown as NextApiRequestLike);

    const req3 = await isClientRateLimited({
      headers: {
        'x-forwarded-for': '1.2.3.4',
        authorization: 'bearer fake-header'
      },
      method: 'POST',
      url: '/api/route/path1'
    } as unknown as NextApiRequestLike);

    const req4 = await isClientRateLimited({
      headers: {
        'x-forwarded-for': '5.6.7.8'
      },
      method: 'POST',
      url: '/api/route/path1'
    } as unknown as NextApiRequestLike);

    const req5 = await isClientRateLimited({
      headers: {
        'x-forwarded-for': '1.2.3.4',
        authorization: `bearer ${BANNED_BEARER_TOKEN}`
      },
      method: 'POST',
      url: '/api/route/path1'
    } as unknown as NextApiRequestLike);

    const req6 = await isClientRateLimited({
      headers: {
        // ? Should work with different cases too
        authorization: `bEaReR ${BANNED_BEARER_TOKEN}`
      },
      method: 'POST',
      url: '/api/route/path1'
    } as unknown as NextApiRequestLike);

    expect(req1.isLimited).toBeFalse();
    expect(req2.isLimited).toBeTrue();
    expect(req3.isLimited).toBeFalse();
    expect(req4.isLimited).toBeFalse();
    expect(req5.isLimited).toBeTrue();
    expect(req6.isLimited).toBeTrue();

    const minToMs = (minutes: number) => 1000 * 60 * minutes;
    //expect(req1.retryAfter).toBeWithin(minToMs(15) - 1000, minToMs(15) + 1000);
    expect(req2.retryAfter).toBeWithin(minToMs(60) - 1000, minToMs(60) + 1000);
    //expect(req3.retryAfter).toBeWithin(minToMs(15) - 1000, minToMs(15) + 1000);
    //expect(req4.retryAfter).toBeWithin(minToMs(15) - 1000, minToMs(15) + 1000);
    // ? Should return greater of the two ban times (header time > ip time)
    expect(req5.retryAfter).toBeWithin(minToMs(60) - 1000, minToMs(60) + 1000);
    expect(req6.retryAfter).toBeWithin(minToMs(60) - 1000, minToMs(60) + 1000);
  });

  it('returns false if both ip and header (if provided) are not rate limited', async () => {
    expect.hasAssertions();
    const req1 = {
      headers: { 'x-forwarded-for': '1.2.3.5' },
      method: 'POST',
      url: '/api/route/path1'
    } as unknown as NextApiRequestLike;

    const req2 = {
      headers: {
        'x-forwarded-for': '8.8.8.8',
        authorization: 'bearer fake-header'
      },
      method: 'GET',
      url: '/api/route/path2'
    } as unknown as NextApiRequestLike;

    await expect(isClientRateLimited(req1)).resolves.toStrictEqual({
      isLimited: false,
      retryAfter: 0
    });
    await expect(isClientRateLimited(req2)).resolves.toStrictEqual({
      isLimited: false,
      retryAfter: 0
    });
  });

  it('returns false if "until" time has passed', async () => {
    expect.hasAssertions();

    const req = {
      headers: { authorization: `bearer ${BANNED_BEARER_TOKEN}` },
      method: 'POST',
      url: '/api/route/path1'
    } as unknown as NextApiRequestLike;

    await expect(isClientRateLimited(req)).resolves.toStrictEqual({
      isLimited: true,
      retryAfter: expect.any(Number)
    });

    await (await getDb({ name: 'root' }))
      .collection<InternalLimitedLogEntry>('limited-log')
      .updateOne(
        { header: `bearer ${BANNED_BEARER_TOKEN}` },
        { $set: { until: Date.now() - 10 ** 5 } }
      );

    await expect(isClientRateLimited(req)).resolves.toStrictEqual({
      isLimited: false,
      retryAfter: 0
    });
  });

  it('works with modern Request objects', async () => {
    expect.hasAssertions();

    const req1 = await isClientRateLimited(
      new Request('fake://localhost/api/route/path1', {
        headers: new Headers({ 'x-forwarded-for': '1.2.3.4' }),
        method: 'POST'
      })
    );

    const req2 = await isClientRateLimited(
      new Request('fake://localhost/api/route/path2', {
        headers: {
          'x-forwarded-for': '8.8.8.8',
          // ? Should work with different cases too
          authorization: `BEARER ${BANNED_BEARER_TOKEN}`
        },
        method: 'GET'
      })
    );

    const req3 = await isClientRateLimited(
      new Request('fake://localhost/api/route/path1', {
        headers: new Headers({
          'x-forwarded-for': '1.2.3.4',
          authorization: 'bearer fake-header'
        }),
        method: 'POST'
      })
    );

    const req4 = await isClientRateLimited(
      new Request('fake://localhost/api/route/path1', {
        headers: {
          'x-forwarded-for': '5.6.7.8'
        },
        method: 'POST'
      })
    );

    const req5 = await isClientRateLimited(
      new Request('fake://localhost/api/route/path1', {
        headers: new Headers({
          'x-forwarded-for': '1.2.3.4',
          authorization: `bearer ${BANNED_BEARER_TOKEN}`
        }),
        method: 'PUT'
      })
    );

    const req6 = await isClientRateLimited(
      new Request('fake://localhost/api/route/path1', {
        headers: {
          // ? Should work with different cases too
          authorization: `bEaReR ${BANNED_BEARER_TOKEN}`
        },
        method: 'PATCH'
      })
    );

    expect(req1.isLimited).toBeFalse();
    expect(req2.isLimited).toBeTrue();
    expect(req3.isLimited).toBeFalse();
    expect(req4.isLimited).toBeFalse();
    expect(req5.isLimited).toBeTrue();
    expect(req6.isLimited).toBeTrue();

    const minToMs = (minutes: number) => 1000 * 60 * minutes;
    //expect(req1.retryAfter).toBeWithin(minToMs(15) - 1000, minToMs(15) + 1000);
    expect(req2.retryAfter).toBeWithin(minToMs(60) - 1000, minToMs(60) + 1000);
    //expect(req3.retryAfter).toBeWithin(minToMs(15) - 1000, minToMs(15) + 1000);
    //expect(req4.retryAfter).toBeWithin(minToMs(15) - 1000, minToMs(15) + 1000);
    // ? Should return greater of the two ban times (header time > ip time)
    expect(req5.retryAfter).toBeWithin(minToMs(60) - 1000, minToMs(60) + 1000);
    expect(req6.retryAfter).toBeWithin(minToMs(60) - 1000, minToMs(60) + 1000);
  });
});

describe('::removeRateLimit', () => {
  it('removes an active rate limit by ip, header', async () => {
    expect.hasAssertions();

    const db = (await getDb({ name: 'root' })).collection('limited-log');

    await expect(
      db.countDocuments({
        header: dummyRootData['limited-log'][0]!.header,
        until: { $gt: Date.now() }
      })
    ).resolves.toBe(1);

    await expect(
      removeRateLimit({ target: { header: dummyRootData['limited-log'][0]!.header } })
    ).resolves.toBe(1);

    await expect(
      db.countDocuments({
        header: dummyRootData['limited-log'][0]!.header,
        until: { $gt: Date.now() }
      })
    ).resolves.toBe(0);
  });

  it('removes an active rate limit by ip or header (simultaneously)', async () => {
    expect.hasAssertions();

    const db = (await getDb({ name: 'root' })).collection('limited-log');

    await expect(
      db.countDocuments({
        $or: [
          { ip: dummyRootData['limited-log'][0]!.ip },
          { header: dummyRootData['limited-log'][0]!.header }
        ],
        until: { $gt: Date.now() }
      })
    ).resolves.toBe(2);

    await expect(
      removeRateLimit({
        target: {
          ip: dummyRootData['limited-log'][0]!.ip,
          header: dummyRootData['limited-log'][0]!.header
        }
      })
    ).resolves.toBe(1);

    await expect(
      db.countDocuments({
        $or: [
          { ip: dummyRootData['limited-log'][0]!.ip },
          { header: dummyRootData['limited-log'][0]!.header }
        ],
        until: { $gt: Date.now() }
      })
    ).resolves.toBe(1);
  });

  it('only removes active rate limits', async () => {
    expect.hasAssertions();

    const db = (await getDb({ name: 'root' })).collection('limited-log');

    await db.updateOne(
      { header: dummyRootData['limited-log'][0]!.header },
      { $set: { until: Date.now() } }
    );

    await expect(
      removeRateLimit({
        target: {
          ip: dummyRootData['limited-log'][0]!.ip,
          header: dummyRootData['limited-log'][0]!.header
        }
      })
    ).resolves.toBe(0);
  });

  it('returns 0 if no active rate limit was found', async () => {
    expect.hasAssertions();

    const db = (await getDb({ name: 'root' })).collection('limited-log');

    await db.updateOne(
      { header: dummyRootData['limited-log'][0]!.header },
      { $set: { until: Date.now() } }
    );

    await expect(
      removeRateLimit({ target: { header: dummyRootData['limited-log'][0]!.header } })
    ).resolves.toBe(0);
  });

  it('rejects if passed invalid data', async () => {
    expect.hasAssertions();
    await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(removeRateLimit({} as any)).rejects.toMatchObject({
        message: 'must provide either an ip or a header'
      }),

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(removeRateLimit({ something: 'else' } as any)).rejects.toMatchObject({
        message: 'must provide either an ip or a header'
      }),

      expect(removeRateLimit({ target: undefined })).rejects.toMatchObject({
        message: 'must provide either an ip or a header'
      }),

      // @ts-expect-error: testing
      expect(removeRateLimit({ target: {} })).rejects.toMatchObject({
        message: 'must provide either an ip or a header'
      }),

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(removeRateLimit({ target: { ip: true } } as any)).rejects.toMatchObject({
        message: 'ip must be a non-empty string'
      }),

      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        removeRateLimit({ target: { header: true } as any })
      ).rejects.toMatchObject({
        message: 'header must be a non-empty string'
      }),

      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        removeRateLimit({ target: { ip: '', header: true } as any })
      ).rejects.toMatchObject({
        message: 'ip must be a non-empty string'
      }),

      expect(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        removeRateLimit({ target: { ip: null, header: '' } as any })
      ).rejects.toMatchObject({
        message: 'ip must be a non-empty string'
      }),

      expect(
        removeRateLimit({ target: { ip: undefined, header: undefined } })
      ).rejects.toMatchObject({ message: 'must provide either an ip or a header' }),
      expect(removeRateLimit({ target: { ip: '', header: '' } })).rejects.toMatchObject({
        message: 'ip must be a non-empty string'
      })
    ]);
  });
});

describe('::getAllRateLimits', () => {
  it('returns all active rate limits in the system', async () => {
    expect.hasAssertions();

    const db = (await getDb({ name: 'root' })).collection('limited-log');

    await expect(getAllRateLimits()).resolves.toIncludeSameMembers(
      await db
        .find({ until: { $gt: Date.now() } }, { projection: { _id: false } })
        .toArray()
    );
  });

  it('does not crash if database is empty', async () => {
    expect.hasAssertions();

    const db = (await getDb({ name: 'root' })).collection('limited-log');
    await db.deleteMany({});

    await expect(getAllRateLimits()).resolves.toStrictEqual([]);
  });
});
