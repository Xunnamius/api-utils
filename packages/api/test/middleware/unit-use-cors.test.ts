import { testApiHandler } from 'next-test-api-route-handler';

import { withMiddleware } from 'universe+api';
import { makeMiddleware } from 'universe+api:middleware/use-cors.ts';

import { legacyNoopHandler, withLegacyConfig } from 'testverse:util.ts';

import type { Context, Options } from 'universe+api:middleware/use-cors.ts';

describe('<legacy mode>', () => {
  it('responds correctly to preflight OPTIONS requests', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware(legacyNoopHandler, {
          descriptor: '/fake',
          use: [],
          options: { legacyMode: true }
        })
      ),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'OPTIONS' });
        expect(res.status).toBe(200);
        expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
        expect(res.headers.get('Access-Control-Allow-Methods')).toBeNull();
      }
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, allowedMethods: ['GET', 'POST', 'HEAD'] }
        })
      ),
      test: async ({ fetch }) => {
        let res = await fetch({ method: 'OPTIONS' });
        expect(res.status).toBe(200);
        expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
        expect(res.headers.get('Access-Control-Allow-Methods')).toBe('GET,POST,HEAD');

        res = await fetch({ method: 'GET' });
        expect(res.status).toBe(200);
      }
    });
  });

  it('responds correctly to standard non-OPTIONS requests', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware(legacyNoopHandler, {
          descriptor: '/fake',
          use: [],
          options: { legacyMode: true }
        })
      ),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'OPTIONS' });
        expect(res.status).toBe(200);
        expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
        expect(res.headers.get('Access-Control-Allow-Methods')).toBeNull();
      }
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, allowedMethods: ['GET', 'POST', 'HEAD'] }
        })
      ),
      test: async ({ fetch }) => {
        let res = await fetch({ method: 'OPTIONS' });
        expect(res.status).toBe(200);
        expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
        expect(res.headers.get('Access-Control-Allow-Methods')).toBe('GET,POST,HEAD');

        res = await fetch({ method: 'GET' });
        expect(res.status).toBe(200);
      }
    });
  });
});
