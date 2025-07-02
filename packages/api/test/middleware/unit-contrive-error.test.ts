import contriveError from '@-xun/adhesive/contrive-error';
import { isDueForContrivedError } from '@-xun/contrived';
import { testApiHandler } from 'next-test-api-route-handler';

import { noopHandler, wrapHandler } from 'testverse/setup';
import { asMocked } from 'testverse:util.ts';

import type { Options } from '@-xun/adhesive/contrive-error';

jest.mock('@-xun/contrived');

const mockIsDueForContrivedError = asMocked(isDueForContrivedError);

beforeEach(() => {
  mockIsDueForContrivedError.mockReturnValue(Promise.resolve(false));
});

it('does not inject contrived errors by default', async () => {
  expect.hasAssertions();

  await testApiHandler({
    rejectOnHandlerError: true,
    pagesHandler: wrapHandler(
      withMiddleware<Options>(noopHandler, {
        descriptor: '/fake',
        use: [contriveError]
      })
    ),
    test: async ({ fetch }) => {
      mockIsDueForContrivedError.mockReturnValue(Promise.resolve(true));
      await expect(fetch().then((r) => r.status)).resolves.toBe(200);
    }
  });
});

it('injects contrived errors when due if enabled', async () => {
  expect.hasAssertions();

  await testApiHandler({
    rejectOnHandlerError: true,
    pagesHandler: wrapHandler(
      withMiddleware<Options>(noopHandler, {
        descriptor: '/fake',
        use: [contriveError],
        options: { enableContrivedErrors: true }
      })
    ),
    test: async ({ fetch }) => {
      mockIsDueForContrivedError.mockReturnValue(Promise.resolve(false));
      await expect(fetch().then((r) => r.status)).resolves.toBe(200);
      mockIsDueForContrivedError.mockReturnValue(Promise.resolve(true));
      await expect(fetch().then((r) => r.status)).resolves.toBe(555);
      mockIsDueForContrivedError.mockReturnValue(Promise.resolve(false));
      await expect(fetch().then((r) => r.status)).resolves.toBe(200);
    }
  });
});
