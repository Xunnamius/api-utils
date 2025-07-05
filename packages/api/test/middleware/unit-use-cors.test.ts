import { testApiHandler } from 'next-test-api-route-handler';

import { withMiddleware } from 'universe+api';

import {
  defaultAllowedCorsMethods,
  makeMiddleware
} from 'universe+api:middleware/use-cors.ts';

import {
  legacyNoopHandler,
  modernNoopHandler,
  spreadHandlerAcrossMethods,
  withLegacyConfig
} from 'testverse:util.ts';

import type {
  ModernMiddlewareContext,
  NextApiRequestLike,
  NextApiResponseLike
} from 'universe+api';

import type { Context, Options } from 'universe+api:middleware/use-cors.ts';

describe('<legacy mode>', () => {
  it('responds correctly to preflight OPTIONS requests and non-preflight requests', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyDeadNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true }
        })
      ),
      test: async ({ fetch }) => {
        {
          const res = await fetch({ method: 'OPTIONS' });
          expect(res.status).toBe(204);
          expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
          expect(res.headers.get('Access-Control-Allow-Credentials')).toBeNull();
          expect(res.headers.get('Access-Control-Expose-Headers')).toBeNull();
          expect(res.headers.get('Access-Control-Allow-Methods')).toBe(
            defaultAllowedCorsMethods.join(',')
          );
          expect(res.headers.get('Access-Control-Allow-Headers')).toBeNull();
          expect(res.headers.get('Access-Control-Max-Age')).toBeNull();
          expect(res.headers.get('Vary')).toBe('Access-Control-Request-Headers');
        }

        {
          const res = await fetch({ method: 'GET' });
          expect(res.status).toBe(200);
          expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
          expect(res.headers.get('Access-Control-Allow-Credentials')).toBeNull();
          expect(res.headers.get('Access-Control-Expose-Headers')).toBeNull();
        }
      }
    });
  });

  it('respects allowedMethods configuration', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyDeadNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, allowedMethods: ['GET', 'POST', 'HEAD'] }
        })
      ),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'OPTIONS' });
        expect(res.status).toBe(204);
        expect(res.headers.get('Access-Control-Allow-Methods')).toBe(
          ['GET', 'POST', 'HEAD'].join(',')
        );
      }
    });
  });

  it('mirrors request-headers header in allow-headers and vary headers', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyDeadNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true }
        })
      ),
      test: async ({ fetch }) => {
        {
          const res = await fetch({
            method: 'OPTIONS',
            headers: { 'Access-Control-Request-Headers': 'x-header-1, x-header-2' }
          });
          expect(res.status).toBe(204);
          expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
          expect(res.headers.get('Access-Control-Allow-Credentials')).toBeNull();
          expect(res.headers.get('Access-Control-Expose-Headers')).toBeNull();
          expect(res.headers.get('Access-Control-Allow-Methods')).toBe(
            defaultAllowedCorsMethods.join(',')
          );
          expect(res.headers.get('Access-Control-Allow-Headers')).toBe(
            'x-header-1, x-header-2'
          );
          expect(res.headers.get('Access-Control-Max-Age')).toBeNull();
          expect(res.headers.get('Vary')).toBe('Access-Control-Request-Headers');
        }

        {
          const res = await fetch({ method: 'GET' });
          expect(res.status).toBe(200);
          expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
          expect(res.headers.get('Access-Control-Allow-Credentials')).toBeNull();
          expect(res.headers.get('Access-Control-Expose-Headers')).toBeNull();
        }
      }
    });
  });

  it('appends cors headers to existing response headers', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>((_req, res) => res.send({ sent: true }), {
          descriptor: '/fake',
          use: [
            (_reqOrRequest, resOrContext) => {
              const res = resOrContext as NextApiResponseLike;
              res.setHeader('x-custom-header-1', 'some-value');
              res.status(404);
            },
            makeMiddleware()
          ],
          options: { legacyMode: true, allowedMethods: ['GET', 'POST', 'HEAD'] }
        })
      ),
      test: async ({ fetch }) => {
        {
          const res = await fetch({ method: 'OPTIONS' });
          expect(res.status).toBe(204);
          expect(res.headers.get('x-custom-header-1')).toBe('some-value');
          expect(res.headers.get('Access-Control-Allow-Methods')).toBe(
            ['GET', 'POST', 'HEAD'].join(',')
          );
        }

        {
          const res = await fetch();
          expect(res.status).toBe(404);
          expect(res.headers.get('x-custom-header-1')).toBe('some-value');
          await expect(res.json()).resolves.toStrictEqual({ sent: true });
        }
      }
    });
  });

  it('preserves existing "vary" header', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>((_req, res) => res.send({ sent: true }), {
          descriptor: '/fake',
          use: [
            (_reqOrRequest, resOrContext) => {
              const res = resOrContext as NextApiResponseLike;
              res.setHeader('vary', 'some-value');
            },
            makeMiddleware()
          ],
          options: { legacyMode: true, allowedMethods: ['GET', 'POST', 'HEAD'] }
        })
      ),
      test: async ({ fetch }) => {
        {
          const res = await fetch({ method: 'OPTIONS' });
          expect(res.status).toBe(204);
          expect(res.headers.get('vary')).toBe(
            'some-value, Access-Control-Request-Headers'
          );
        }
      }
    });
  });

  it('handles weird undefined legacy headers', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyDeadNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, allowedMethods: ['GET', 'POST', 'HEAD'] }
        })
      ),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'OPTIONS' });
        expect(res.status).toBe(204);
        expect(res.headers.get('Access-Control-Allow-Methods')).toBe(
          ['GET', 'POST', 'HEAD'].join(',')
        );
      }
    });
  });
});

describe('<modern mode>', () => {
  it('responds correctly to preflight OPTIONS requests and non-preflight requests', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: spreadHandlerAcrossMethods(
        withMiddleware<Options, Context>(modernDeadNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()]
        }),
        ['GET', 'OPTIONS']
      ),
      test: async ({ fetch }) => {
        {
          const res = await fetch({ method: 'OPTIONS' });
          expect(res.status).toBe(204);
          expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
          expect(res.headers.get('Access-Control-Allow-Credentials')).toBeNull();
          expect(res.headers.get('Access-Control-Expose-Headers')).toBeNull();
          expect(res.headers.get('Access-Control-Allow-Methods')).toBe(
            defaultAllowedCorsMethods.join(',')
          );
          expect(res.headers.get('Access-Control-Allow-Headers')).toBeNull();
          expect(res.headers.get('Access-Control-Max-Age')).toBeNull();
          expect(res.headers.get('Vary')).toBe('Access-Control-Request-Headers');
        }

        {
          const res = await fetch({ method: 'GET' });
          expect(res.status).toBe(200);
          expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
          expect(res.headers.get('Access-Control-Allow-Credentials')).toBeNull();
          expect(res.headers.get('Access-Control-Expose-Headers')).toBeNull();
        }
      }
    });
  });

  it('respects allowedMethods configuration', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: spreadHandlerAcrossMethods(
        withMiddleware<Options, Context>(modernDeadNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { allowedMethods: ['GET', 'POST', 'HEAD'] }
        }),
        ['GET', 'OPTIONS']
      ),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'OPTIONS' });
        expect(res.status).toBe(204);
        expect(res.headers.get('Access-Control-Allow-Methods')).toBe(
          ['GET', 'POST', 'HEAD'].join(',')
        );
      }
    });
  });

  it('mirrors request-headers header in allow-headers and vary headers', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: spreadHandlerAcrossMethods(
        withMiddleware<Options, Context>(modernDeadNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()]
        }),
        ['GET', 'OPTIONS']
      ),
      test: async ({ fetch }) => {
        {
          const res = await fetch({
            method: 'OPTIONS',
            headers: { 'Access-Control-Request-Headers': 'x-header-1, x-header-2' }
          });
          expect(res.status).toBe(204);
          expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
          expect(res.headers.get('Access-Control-Allow-Credentials')).toBeNull();
          expect(res.headers.get('Access-Control-Expose-Headers')).toBeNull();
          expect(res.headers.get('Access-Control-Allow-Methods')).toBe(
            defaultAllowedCorsMethods.join(',')
          );
          expect(res.headers.get('Access-Control-Allow-Headers')).toBe(
            'x-header-1, x-header-2'
          );
          expect(res.headers.get('Access-Control-Max-Age')).toBeNull();
          expect(res.headers.get('Vary')).toBe('Access-Control-Request-Headers');
        }

        {
          const res = await fetch({ method: 'GET' });
          expect(res.status).toBe(200);
          expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
          expect(res.headers.get('Access-Control-Allow-Credentials')).toBeNull();
          expect(res.headers.get('Access-Control-Expose-Headers')).toBeNull();
        }
      }
    });
  });

  it('appends cors headers to existing response headers', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: spreadHandlerAcrossMethods(
        withMiddleware<Options, Context>(() => Response.json({ sent: true }), {
          descriptor: '/fake',
          use: [
            (_, context_) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const context = context_ as ModernMiddlewareContext<any, any>;
              context.runtime.response = new Response(null, {
                status: 404,
                headers: { 'x-custom-header-1': 'some-value' }
              });
            },
            makeMiddleware()
          ],
          options: { allowedMethods: ['GET', 'POST', 'HEAD', 'OPTIONS'] }
        }),
        ['GET', 'POST', 'HEAD', 'OPTIONS']
      ),
      test: async ({ fetch }) => {
        {
          const res = await fetch({ method: 'OPTIONS' });
          expect(res.status).toBe(204);
          expect(res.headers.get('x-custom-header-1')).toBe('some-value');
          expect(res.headers.get('Access-Control-Allow-Methods')).toBe(
            ['GET', 'POST', 'HEAD'].join(',')
          );
        }

        {
          const res = await fetch();
          expect(res.status).toBe(404);
          expect(res.headers.get('x-custom-header-1')).toBe('some-value');
          await expect(res.json()).resolves.toStrictEqual({ sent: true });
        }
      }
    });
  });
});

async function legacyDeadNoopHandler(req: NextApiRequestLike, res: NextApiResponseLike) {
  if (req.method === 'OPTIONS') {
    throw new Error('must not reach this point when handling OPTIONS');
  }

  await legacyNoopHandler(req, res);
}

async function modernDeadNoopHandler(request: Request) {
  if (request.method === 'OPTIONS') {
    throw new Error('must not reach this point when handling OPTIONS');
  }

  await modernNoopHandler(request);
}
