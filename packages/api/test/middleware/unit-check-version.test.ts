import { testApiHandler } from 'next-test-api-route-handler';

import { withMiddleware } from 'universe+api';
import { makeMiddleware } from 'universe+api:middleware/check-version.ts';

import { legacyNoopHandler, mockEnvFactory, withLegacyConfig } from 'testverse:util.ts';

import type { Context, Options } from 'universe+api:middleware/check-version.ts';

const withMockedEnv = mockEnvFactory({ NODE_ENV: 'test' });

describe('<legacy mode>', () => {
  it('is a noop by default', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true }
        })
      ),
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, apiVersion: 'one' }
        })
      ),
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });
  });

  it('sends 404 if its corresponding version is disabled', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, apiVersion: '1' }
        })
      ),
      test: async ({ fetch }) => {
        await withMockedEnv(
          async () => {
            expect((await fetch()).status).toBe(404);
          },
          { DISABLED_API_VERSIONS: '1' }
        );

        await withMockedEnv(
          async () => {
            expect((await fetch()).status).toBe(200);
          },
          { DISABLED_API_VERSIONS: '2' }
        );

        await withMockedEnv(
          async () => {
            expect((await fetch()).status).toBe(404);
          },
          { DISABLED_API_VERSIONS: '2,1' }
        );

        await withMockedEnv(
          async () => {
            expect((await fetch()).status).toBe(200);
          },
          { DISABLED_API_VERSIONS: '3,2' }
        );
      }
    });

    await withMockedEnv(
      async () => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: '1' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: '2' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(404)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: 'three' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(404)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: '4' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(404)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(async () => undefined, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: '4' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(404)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
        });
      },
      { DISABLED_API_VERSIONS: 'three,4,2,five' }
    );
  });

  it('is a noop if DISABLED_API_VERSIONS is an empty string', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: '4' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
        });
      },
      { DISABLED_API_VERSIONS: '' }
    );
  });
});

describe.skip('<modern mode>', () => {
  it('is a noop by default', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true }
        })
      ),
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, apiVersion: 'one' }
        })
      ),
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });
  });

  it('sends 404 if its corresponding version is disabled', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, apiVersion: '1' }
        })
      ),
      test: async ({ fetch }) => {
        await withMockedEnv(
          async () => {
            expect((await fetch()).status).toBe(404);
          },
          { DISABLED_API_VERSIONS: '1' }
        );

        await withMockedEnv(
          async () => {
            expect((await fetch()).status).toBe(200);
          },
          { DISABLED_API_VERSIONS: '2' }
        );

        await withMockedEnv(
          async () => {
            expect((await fetch()).status).toBe(404);
          },
          { DISABLED_API_VERSIONS: '2,1' }
        );

        await withMockedEnv(
          async () => {
            expect((await fetch()).status).toBe(200);
          },
          { DISABLED_API_VERSIONS: '3,2' }
        );
      }
    });

    await withMockedEnv(
      async () => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: '1' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: '2' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(404)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: 'three' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(404)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: '4' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(404)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(async () => undefined, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: '4' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(404)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
        });
      },
      { DISABLED_API_VERSIONS: 'three,4,2,five' }
    );
  });

  it('is a noop if DISABLED_API_VERSIONS is an empty string', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true, apiVersion: '4' }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: { legacyMode: true }
            })
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
        });
      },
      { DISABLED_API_VERSIONS: '' }
    );
  });
});
