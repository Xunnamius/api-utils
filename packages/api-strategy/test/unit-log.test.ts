import { getDb } from '@-xun/mongo-schema';
import { setupMemoryServerOverride } from '@-xun/mongo-test';

import { BANNED_BEARER_TOKEN } from 'universe+api-strategy:auth.ts';
import { addToRequestLog } from 'universe+api-strategy:log.ts';
import { getCommonDummyData } from 'universe+api-strategy:mongo/dummy.ts';
import { getCommonSchemaConfig } from 'universe+api-strategy:mongo/index.ts';

import { mockDateNowMs, useMockDateNow, withMockedOutput } from 'testverse:util.ts';

import type { HttpStatusCode } from '@-xun/types';

import type {
  NextApiRequestLike,
  NextApiResponseLike
} from 'multiverse+shared:next-like.ts';

import type { InternalRequestLogEntry } from 'universe+api-strategy:log.ts';

useMockDateNow();
setupMemoryServerOverride({
  schema: getCommonSchemaConfig(),
  data: getCommonDummyData()
});

const mockPerfNow = 1234;

describe('::addToRequestLog', () => {
  it('adds request to mongo collection', async () => {
    expect.hasAssertions();

    const req1 = {
      headers: { 'x-forwarded-for': '9.9.9.9' },
      method: 'POST',
      url: '/api/route/path1'
    } as unknown as NextApiRequestLike;

    const req2 = {
      headers: {
        'x-forwarded-for': '8.8.8.8',
        authorization: `bearer ${BANNED_BEARER_TOKEN}`
      },
      method: 'GET',
      url: '/api/route/path2'
    } as unknown as NextApiRequestLike;

    const res1 = { statusCode: 211 } as NextApiResponseLike;
    const res2 = { statusCode: 222 } as NextApiResponseLike;

    await addToRequestLog({
      req: req1,
      res: res1,
      endpoint: '/fake',
      durationMs: 1234
    });

    await addToRequestLog({
      req: req2,
      res: res2,
      endpoint: '/fake',
      durationMs: 1234
    });

    const reqlog = (await getDb({ name: 'root' })).collection<InternalRequestLogEntry>(
      'request-log'
    );

    await expect(
      reqlog.findOne({ resStatusCode: 211 as HttpStatusCode })
    ).resolves.toStrictEqual({
      _id: expect.anything(),
      ip: '9.9.9.9',
      header: null,
      route: '/api/route/path1',
      endpoint: '/fake',
      method: 'POST',
      createdAt: mockDateNowMs,
      resStatusCode: 211,
      durationMs: mockPerfNow
    });

    await expect(
      reqlog.findOne({ resStatusCode: 222 as HttpStatusCode })
    ).resolves.toStrictEqual({
      _id: expect.anything(),
      ip: '8.8.8.8',
      header: `bearer ${BANNED_BEARER_TOKEN}`,
      route: '/api/route/path2',
      endpoint: '/fake',
      method: 'GET',
      createdAt: mockDateNowMs,
      resStatusCode: 222,
      durationMs: mockPerfNow
    });
  });

  it('handles null method and/or url and lowercases schema', async () => {
    expect.hasAssertions();

    const req1 = {
      headers: { 'x-forwarded-for': '9.9.9.9' },
      method: null,
      url: '/api/route/path1'
    } as unknown as NextApiRequestLike;

    const req2 = {
      headers: {
        'x-forwarded-for': '8.8.8.8',
        authorization: `BeArEr ${BANNED_BEARER_TOKEN}`
      },
      method: 'GET',
      url: null
    } as unknown as NextApiRequestLike;

    const res1 = { statusCode: 211 } as NextApiResponseLike;
    const res2 = { statusCode: 222 } as NextApiResponseLike;

    await addToRequestLog({
      req: req1,
      res: res1,
      endpoint: '/fake',
      durationMs: 1234
    });

    await addToRequestLog({
      req: req2,
      res: res2,
      endpoint: '/fake',
      durationMs: 1234
    });

    const reqlog = (await getDb({ name: 'root' })).collection<InternalRequestLogEntry>(
      'request-log'
    );

    await expect(
      reqlog.findOne({ resStatusCode: 211 as HttpStatusCode })
    ).resolves.toStrictEqual({
      _id: expect.anything(),
      ip: '9.9.9.9',
      header: null,
      route: '/api/route/path1',
      endpoint: '/fake',
      method: null,
      createdAt: mockDateNowMs,
      resStatusCode: 211,
      durationMs: mockPerfNow
    });

    await expect(
      reqlog.findOne({ resStatusCode: 222 as HttpStatusCode })
    ).resolves.toStrictEqual({
      _id: expect.anything(),
      ip: '8.8.8.8',
      header: `bearer ${BANNED_BEARER_TOKEN}`,
      route: null,
      endpoint: '/fake',
      method: 'GET',
      createdAt: mockDateNowMs,
      resStatusCode: 222,
      durationMs: mockPerfNow
    });
  });

  it('handles null or undefined endpoint metadata with warnings', async () => {
    expect.hasAssertions();

    const req1 = {
      headers: { 'x-forwarded-for': '9.9.9.9' },
      method: 'GET',
      url: '/api/route/path1'
    } as unknown as NextApiRequestLike;

    const req2 = {
      headers: { 'x-forwarded-for': '8.8.8.8' },
      method: 'GET',
      url: null
    } as unknown as NextApiRequestLike;

    const res1 = { statusCode: 211 } as NextApiResponseLike;
    const res2 = { statusCode: 222 } as NextApiResponseLike;
    const res3 = { statusCode: 333 } as NextApiResponseLike;

    const reqlog = (await getDb({ name: 'root' })).collection<InternalRequestLogEntry>(
      'request-log'
    );

    await withMockedOutput(async ({ nodeErrorSpy }) => {
      await addToRequestLog({
        req: req1,
        res: res1,
        endpoint: null,
        durationMs: 1234
      });

      expect(nodeErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(`at url: ${String(req1.url)}`)
      );

      await expect(
        reqlog.findOne({ resStatusCode: 211 as HttpStatusCode })
      ).resolves.toStrictEqual(
        expect.objectContaining({
          endpoint: null
        })
      );

      await addToRequestLog({
        req: req2,
        res: res2,
        endpoint: undefined,
        durationMs: 1234
      });

      expect(nodeErrorSpy).toHaveBeenCalledWith(expect.stringContaining('at url: null'));

      await expect(
        reqlog.findOne({ resStatusCode: 222 as HttpStatusCode })
      ).resolves.toStrictEqual(
        expect.objectContaining({
          endpoint: null
        })
      );

      // @ts-expect-error: purposely missing endpoint parameter
      await addToRequestLog({ req: req2, res: res3 });

      expect(nodeErrorSpy).toHaveBeenCalledTimes(3);

      await expect(
        reqlog.findOne({ resStatusCode: 333 as HttpStatusCode })
      ).resolves.toStrictEqual(
        expect.objectContaining({
          endpoint: null
        })
      );

      await addToRequestLog({
        req: req2,
        res: res3,
        endpoint: '/fake',
        durationMs: 1234
      });

      expect(nodeErrorSpy).toHaveBeenCalledTimes(3);
    });
  });

  it('works with modern Request objects', async () => {
    expect.hasAssertions();

    const request1 = new Request('http://localhost/api/route/path1', {
      headers: new Headers({ 'x-forwarded-for': '9.9.9.9' }),
      method: 'POST'
    });

    const request2 = new Request('http://localhost/api/route/path2', {
      headers: {
        'x-forwarded-for': '8.8.8.8',
        authorization: `bearer ${BANNED_BEARER_TOKEN}`
      },
      method: 'GET'
    });

    const response1 = new Response(null, { status: 211 });
    const response2 = new Response('OK', { status: 222 });

    await addToRequestLog({
      request: request1,
      response: response1,
      endpoint: '/fake',
      durationMs: 1234
    });

    await addToRequestLog({
      request: request2,
      response: response2,
      endpoint: '/fake',
      durationMs: 1234
    });

    const reqlog = (await getDb({ name: 'root' })).collection<InternalRequestLogEntry>(
      'request-log'
    );

    await expect(
      reqlog.findOne({ resStatusCode: 211 as HttpStatusCode })
    ).resolves.toStrictEqual({
      _id: expect.anything(),
      ip: '9.9.9.9',
      header: null,
      route: '/api/route/path1',
      endpoint: '/fake',
      method: 'POST',
      createdAt: mockDateNowMs,
      resStatusCode: 211,
      durationMs: mockPerfNow
    });

    await expect(
      reqlog.findOne({ resStatusCode: 222 as HttpStatusCode })
    ).resolves.toStrictEqual({
      _id: expect.anything(),
      ip: '8.8.8.8',
      header: `bearer ${BANNED_BEARER_TOKEN}`,
      route: '/api/route/path2',
      endpoint: '/fake',
      method: 'GET',
      createdAt: mockDateNowMs,
      resStatusCode: 222,
      durationMs: mockPerfNow
    });
  });
});
