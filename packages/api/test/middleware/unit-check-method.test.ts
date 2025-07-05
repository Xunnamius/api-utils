import { testApiHandler } from 'next-test-api-route-handler';

import { withMiddleware } from 'universe+api';
import { ErrorMessage } from 'universe+api:error.ts';
import { makeMiddleware } from 'universe+api:middleware/check-method.ts';

import {
  legacyNoopHandler,
  mockEnvFactory,
  withLegacyConfig,
  withMockedOutput
} from 'testverse:util.ts';

import type { ValidHttpMethod } from '@-xun/types';
import type { Context, Options } from 'universe+api:middleware/check-method.ts';

const withMockedEnv = mockEnvFactory({ NODE_ENV: 'test' });

describe('<legacy mode>', () => {
  it('sends 200 for allowed methods', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, allowedMethods: ['GET', 'DELETE', 'POST', 'PUT'] }
        })
      ),
      test: async ({ fetch }) => {
        expect((await fetch({ method: 'GET' })).status).toBe(200);
        expect((await fetch({ method: 'POST' })).status).toBe(200);
        expect((await fetch({ method: 'PUT' })).status).toBe(200);
        expect((await fetch({ method: 'DELETE' })).status).toBe(200);
      }
    });
  });

  it('is restrictive by default', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true }
        })
      ),
      test: async ({ fetch }) => {
        expect((await fetch({ method: 'GET' })).status).toBe(405);
        expect((await fetch({ method: 'POST' })).status).toBe(405);
        expect((await fetch({ method: 'PUT' })).status).toBe(405);
        expect((await fetch({ method: 'DELETE' })).status).toBe(405);
      }
    });
  });

  it('sends 405 when request.method is undefined', async () => {
    expect.hasAssertions();

    await testApiHandler({
      requestPatcher: (req) => (req.method = undefined),
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true }
        })
      ),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(405);
      }
    });
  });

  it('sends 405 when encountering unlisted methods', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, allowedMethods: ['POST', 'PUT'] }
        })
      ),
      test: async ({ fetch }) => {
        expect((await fetch({ method: 'GET' })).status).toBe(405);
        expect((await fetch({ method: 'POST' })).status).toBe(200);
        expect((await fetch({ method: 'PUT' })).status).toBe(200);
        expect((await fetch({ method: 'DELETE' })).status).toBe(405);
      }
    });
  });

  it('sends 405 when encountering globally disallowed methods', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        await testApiHandler({
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: {
                legacyMode: true,
                allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
              }
            })
          ),
          test: async ({ fetch }) => {
            expect((await fetch({ method: 'GET' })).status).toBe(200);
            expect((await fetch({ method: 'POST' })).status).toBe(405);
            expect((await fetch({ method: 'PUT' })).status).toBe(405);
            expect((await fetch({ method: 'DELETE' })).status).toBe(405);
          }
        });
      },
      { DISALLOWED_METHODS: 'POST,PUT,DELETE' }
    );
  });

  it('ignores spacing when parsing DISALLOWED_METHODS', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        await testApiHandler({
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: {
                legacyMode: true,
                allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
              }
            })
          ),
          test: async ({ fetch }) => {
            expect((await fetch({ method: 'GET' })).status).toBe(405);
            expect((await fetch({ method: 'POST' })).status).toBe(405);
            expect((await fetch({ method: 'PUT' })).status).toBe(405);
            expect((await fetch({ method: 'DELETE' })).status).toBe(200);
          }
        });
      },
      { DISALLOWED_METHODS: '  POST , PUT,          GET ' }
    );
  });

  it('sends an Allow header in 405 responses', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, allowedMethods: ['GET', 'POST', 'HEAD'] }
        })
      ),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'PUT' });
        expect(res.status).toBe(405);
        expect(res.headers.get('allow')).toBe('GET,POST,HEAD');
      }
    });
  });

  it('works even if allowedMethods specified in lowercase', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: {
            legacyMode: true,
            allowedMethods: ['get'] as unknown as ValidHttpMethod[]
          }
        })
      ),
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(200);
      }
    });
  });
});

describe('<modern mode>', () => {
  it('throws when invoked', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          appHandler: {
            GET: withMiddleware<Options, Context>(
              () => {
                expect(false).toBe('should never reach this point');
              },
              {
                descriptor: '/fake',
                use: [makeMiddleware()]
              }
            )
          },
          test: async ({ fetch }) => void (await fetch())
        })
      ).rejects.toThrow(ErrorMessage.ModernMiddlewareApiNotSupported());

      expect(errorSpy).toHaveBeenCalledOnce();
    });
  });
});
