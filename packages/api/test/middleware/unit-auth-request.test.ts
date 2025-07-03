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
