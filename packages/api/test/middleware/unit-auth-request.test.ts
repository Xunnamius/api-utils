import { getAuthedClientToken } from '@-xun/api-strategy/auth';
import { AuthError } from '@-xun/api-strategy/error';
import { testApiHandler } from 'next-test-api-route-handler';
import { toss } from 'toss-expression';

import { withMiddleware } from 'universe+api';
import { DUMMY_BEARER_TOKEN } from 'universe+api-strategy:auth.ts';
import { dummyRootData } from 'universe+api-strategy:mongo/dummy.ts';
import { makeMiddleware } from 'universe+api:middleware/auth-request.ts';

import {
  asMocked,
  legacyNoopHandler,
  modernNoopHandler,
  spreadHandlerAcrossMethods,
  withLegacyConfig,
  withMockedOutput
} from 'testverse:util.ts';

import type { Context, Options } from 'universe+api:middleware/auth-request.ts';

jest.mock('@-xun/api-strategy/auth');

const mockGetAuthedClientToken = asMocked(getAuthedClientToken);

beforeEach(() => {
  mockGetAuthedClientToken.mockReturnValue(
    Promise.resolve({
      auth_id: DUMMY_BEARER_TOKEN,
      attributes: dummyRootData.auth[1]!.attributes
    })
  );
});

describe('<legacy mode>', () => {
  it('does nothing if request is authed', async () => {
    expect.hasAssertions();

    const authTarget = dummyRootData.auth[1]!;
    mockGetAuthedClientToken.mockReturnValue(
      Promise.resolve({
        auth_id: authTarget._id.toString(),
        attributes: authTarget.attributes
      })
    );

    const pagesHandler = withLegacyConfig(
      withMiddleware<Options, Context>(legacyNoopHandler, {
        descriptor: '/fake',
        use: [makeMiddleware()],
        options: { requiresAuth: true, legacyMode: true }
      })
    );

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler,
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });
  });

  it('does nothing if requiresAuth is false', async () => {
    expect.hasAssertions();

    mockGetAuthedClientToken.mockReturnValue(Promise.resolve(undefined));

    const pagesHandler = withLegacyConfig(
      withMiddleware<Options, Context>(legacyNoopHandler, {
        descriptor: '/fake',
        use: [makeMiddleware()],
        options: { requiresAuth: false, legacyMode: true }
      })
    );

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler,
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });
  });

  it('accepts requiresAuth with a filter', async () => {
    expect.hasAssertions();

    const authTarget = dummyRootData.auth[1]!;
    mockGetAuthedClientToken.mockReturnValue(
      Promise.resolve({
        auth_id: authTarget._id.toString(),
        attributes: authTarget.attributes
      })
    );

    const pagesHandler = withLegacyConfig(
      withMiddleware<Options, Context>(legacyNoopHandler, {
        descriptor: '/fake',
        use: [makeMiddleware()],
        options: { requiresAuth: { filter: { isGlobalAdmin: true } }, legacyMode: true }
      })
    );

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler,
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });

    expect(mockGetAuthedClientToken).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        filter: { isGlobalAdmin: true }
      })
    );
  });

  it('throws if request is not authed', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      const pagesHandler = withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { requiresAuth: true, legacyMode: true }
        })
      );

      mockGetAuthedClientToken.mockImplementation(() =>
        toss(new AuthError('good badness'))
      );

      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler,
          test: async ({ fetch }) => void (await fetch())
        })
      ).rejects.toThrow('good badness');

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});

describe('<modern mode>', () => {
  it('does nothing if request is authed', async () => {
    expect.hasAssertions();

    const authTarget = dummyRootData.auth[1]!;
    mockGetAuthedClientToken.mockReturnValue(
      Promise.resolve({
        auth_id: authTarget._id.toString(),
        attributes: authTarget.attributes
      })
    );

    const appHandler = {
      GET: withMiddleware<Options, Context>(modernNoopHandler, {
        descriptor: '/fake',
        use: [makeMiddleware()],
        options: { requiresAuth: true }
      })
    };

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler,
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });
  });

  it('does nothing if requiresAuth is false', async () => {
    expect.hasAssertions();

    mockGetAuthedClientToken.mockReturnValue(Promise.resolve(undefined));

    const appHandler = spreadHandlerAcrossMethods(
      withMiddleware<Options, Context>(modernNoopHandler, {
        descriptor: '/fake',
        use: [makeMiddleware()],
        options: { requiresAuth: false }
      }),
      ['GET']
    );

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler,
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });
  });

  it('accepts requiresAuth with a filter', async () => {
    expect.hasAssertions();

    const authTarget = dummyRootData.auth[1]!;
    mockGetAuthedClientToken.mockReturnValue(
      Promise.resolve({
        auth_id: authTarget._id.toString(),
        attributes: authTarget.attributes
      })
    );

    const appHandler = spreadHandlerAcrossMethods(
      withMiddleware<Options, Context>(modernNoopHandler, {
        descriptor: '/fake',
        use: [makeMiddleware()],
        options: { requiresAuth: { filter: { isGlobalAdmin: true } } }
      }),
      ['GET']
    );

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler,
      test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
    });

    expect(mockGetAuthedClientToken).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        filter: { isGlobalAdmin: true }
      })
    );
  });

  it('throws if request is not authed', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      const appHandler = {
        GET: withMiddleware<Options, Context>(modernNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { requiresAuth: true }
        })
      };

      mockGetAuthedClientToken.mockImplementation(() =>
        toss(new AuthError('good badness'))
      );

      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          appHandler,
          test: async ({ fetch }) => void (await fetch())
        })
      ).rejects.toThrow('good badness');

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
