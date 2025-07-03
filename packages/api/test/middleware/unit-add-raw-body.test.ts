import { testApiHandler } from 'next-test-api-route-handler';

import { withMiddleware } from 'universe+api';
import { makeMiddleware } from 'universe+api:middleware/add-raw-body.ts';

import {
  legacyNoopHandler,
  withLegacyConfig,
  withMockedOutput
} from 'testverse:util.ts';

import type { Context, Options } from 'universe+api:middleware/add-raw-body.ts';

describe('<legacy mode>', () => {
  it('adds rawBody to request object while still providing parsed body', async () => {
    expect.hasAssertions();

    const pagesHandler = withLegacyConfig(
      withMiddleware<Options, Context>(
        (req, res, { rawBody }) => {
          res.status(200).send({ body: req.body, rawBody });
        },
        {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true }
        }
      )
    );

    pagesHandler.config = { api: { bodyParser: false } };

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler,
      test: async ({ fetch }) => {
        let res, json, rawBody, jsonBody;

        // ? Works with empty body (which otherwise evaluates falsy)
        res = await fetch();
        json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toStrictEqual({ body: '', rawBody: '' });

        // ? Works with empty body as JSON
        res = await fetch({ headers: { 'content-type': 'application/json' } });
        json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toStrictEqual({ body: {}, rawBody: '' });

        jsonBody = { a: 1, b: 'c', d: true };
        rawBody = JSON.stringify(jsonBody);
        res = await fetch({
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: rawBody
        });
        json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toStrictEqual({ body: jsonBody, rawBody });

        jsonBody = { a: 2, b: 'z', d: false };
        rawBody = JSON.stringify(jsonBody);
        res = await fetch({
          method: 'PUT',
          headers: { 'content-type': 'application/ld+json' },
          body: rawBody
        });
        json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toStrictEqual({ body: jsonBody, rawBody });

        jsonBody = { a: '3', b: 'd', e: 'true' };
        rawBody = 'a=3&b=d&e=true';
        res = await fetch({
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          body: rawBody
        });
        json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toStrictEqual({ body: jsonBody, rawBody });

        rawBody = 'hello, world!';
        res = await fetch({
          method: 'POST',
          headers: { 'content-type': 'text/plain' },
          body: rawBody
        });
        json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toStrictEqual({ body: rawBody, rawBody });

        // ? Works with really bad content types
        rawBody = 'hello, world!';
        res = await fetch({
          method: 'POST',
          headers: { 'content-type': '/' },
          body: rawBody
        });
        json = await res.json();

        expect(res.status).toBe(200);
        expect(json).toStrictEqual({ body: rawBody, rawBody });
      }
    });
  });

  it('respects requestBodySizeLimit option', async () => {
    expect.hasAssertions();

    const pagesHandler = withLegacyConfig(
      withMiddleware<Options, Context>(legacyNoopHandler, {
        descriptor: '/fake',
        use: [makeMiddleware()],
        options: { legacyMode: true, requestBodySizeLimit: 1 }
      })
    );

    pagesHandler.config = { api: { bodyParser: false } };

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler,
      test: async ({ fetch }) => {
        expect((await fetch({ method: 'POST', body: 'x' })).status).toBe(200);
        expect((await fetch({ method: 'POST', body: 'xx' })).status).toBe(413);
      }
    });
  });

  it('throws if bodyParser is not disabled', async () => {
    expect.hasAssertions();

    const pagesHandler = withLegacyConfig(
      withMiddleware<Options, Context>(legacyNoopHandler, {
        descriptor: '/fake',
        use: [makeMiddleware()],
        options: { legacyMode: true }
      }),
      {}
    );

    await withMockedOutput(async ({ errorSpy }) => {
      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler,
          test: async ({ fetch }) => void (await fetch())
        })
      ).rejects.toMatchObject({
        message: expect.stringContaining('body parser must be disabled')
      });

      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    pagesHandler.config = { api: { bodyParser: false } };

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler,
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });
  });

  it('throws on bad JSON body', async () => {
    expect.hasAssertions();

    const pagesHandler = withLegacyConfig(
      withMiddleware<Options, Context>(legacyNoopHandler, {
        descriptor: '/fake',
        use: [makeMiddleware()],
        options: { legacyMode: true }
      })
    );

    pagesHandler.config = { api: { bodyParser: false } };

    await withMockedOutput(async ({ errorSpy }) => {
      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler,
          test: async ({ fetch }) =>
            void (await fetch({
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: '<nope>'
            }))
        })
      ).rejects.toMatchObject({
        message: expect.stringContaining('invalid JSON body')
      });

      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('throws on invalid body (raw-body chokes)', async () => {
    expect.hasAssertions();

    const pagesHandler = withLegacyConfig(
      withMiddleware<Options, Context>(legacyNoopHandler, {
        descriptor: '/fake',
        use: [makeMiddleware()],
        options: { legacyMode: true }
      })
    );

    pagesHandler.config = { api: { bodyParser: false } };

    await withMockedOutput(async ({ errorSpy }) => {
      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler,
          requestPatcher(req) {
            req.destroy();
          },
          test: async ({ fetch }) => void (await fetch())
        })
      ).rejects.toMatchObject({
        message: expect.stringContaining('invalid body')
      });

      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });
});
