import { addToRequestLog } from '@-xun/api-strategy/log';
import { testApiHandler } from 'next-test-api-route-handler';
import { toss } from 'toss-expression';

import { withMiddleware } from 'universe+api';
import { makeMiddleware } from 'universe+api:middleware/log-request.ts';

import {
  asMocked,
  legacyNoopHandler,
  modernNoopHandler,
  withLegacyConfig,
  withMockedOutput
} from 'testverse:util.ts';

jest.mock('@-xun/api-strategy/log');

const mockAddToRequestLog = asMocked(addToRequestLog);

beforeEach(() => {
  mockAddToRequestLog.mockReturnValue(Promise.resolve());
});

describe('<legacy mode>', () => {
  it('logs request after call to res.send', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware(async (_req, res) => res.status(404).send({}), {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true }
        })
      ),
      test: async ({ fetch }) => {
        await Promise.all([fetch(), fetch(), fetch()]);
        expect(mockAddToRequestLog).toHaveBeenCalledTimes(3);
      }
    });
  });

  it('logs request after call to res.end', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware(async (_req, res) => void res.status(404).end(), {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true }
        })
      ),
      test: async ({ fetch }) => {
        await Promise.all([fetch(), fetch(), fetch()]);
        expect(mockAddToRequestLog).toHaveBeenCalledTimes(3);
      }
    });
  });

  it('logs request once on multiple calls to res.end', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware(
          async (_req, res) => {
            res.status(404).end();
            res.end();
          },
          {
            descriptor: '/fake',
            use: [makeMiddleware()],
            options: { legacyMode: true }
          }
        )
      ),
      test: async ({ fetch }) => {
        await Promise.all([fetch(), fetch(), fetch()]);
        expect(mockAddToRequestLog).toHaveBeenCalledTimes(3);
      }
    });
  });

  it('ignores request log errors after response sent', async () => {
    expect.hasAssertions();

    mockAddToRequestLog.mockImplementation(() => toss(new Error('fake error')));

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        pagesHandler: withLegacyConfig(
          withMiddleware(legacyNoopHandler, {
            descriptor: '/fake',
            use: [makeMiddleware()],
            useOnError: [],
            options: { legacyMode: true }
          })
        ),
        test: async ({ fetch }) => {
          expect((await fetch()).status).toBe(200);
        }
      });

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});

describe('<modern mode>', () => {
  it('logs request after returning Response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: {
        GET: withMiddleware(async () => Response.json({}, { status: 404 }), {
          descriptor: '/fake',
          use: [makeMiddleware()]
        })
      },
      test: async ({ fetch }) => {
        await Promise.all([fetch(), fetch(), fetch()]);
        expect(mockAddToRequestLog).toHaveBeenCalledTimes(3);
      }
    });
  });

  it('logs request after handling error', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: {
        GET: withMiddleware(async () => Response.json({}, { status: 404 }), {
          descriptor: '/fake',
          use: [makeMiddleware()]
        })
      },
      test: async ({ fetch }) => {
        await Promise.all([fetch(), fetch(), fetch()]);
        expect(mockAddToRequestLog).toHaveBeenCalledTimes(3);
      }
    });
  });

  it('does not trouble client with errors', async () => {
    expect.hasAssertions();

    mockAddToRequestLog.mockImplementation(() => toss(new Error('fake error')));

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        appHandler: {
          GET: withMiddleware(modernNoopHandler, {
            descriptor: '/fake',
            use: [makeMiddleware()],
            useOnError: []
          })
        },
        test: async ({ fetch }) => {
          expect((await fetch()).status).toBe(200);
        }
      });

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
