import { isDueForContrivedError } from '@-xun/api-strategy/contrived';
import { testApiHandler } from 'next-test-api-route-handler';

import { withMiddleware } from 'universe+api';
import { makeMiddleware } from 'universe+api:middleware/contrive-error.ts';

import { asMocked, legacyNoopHandler, withLegacyConfig } from 'testverse:util.ts';

import type { Context, Options } from 'universe+api:middleware/contrive-error.ts';

jest.mock('@-xun/api-strategy/contrived');

const mockIsDueForContrivedError = asMocked(isDueForContrivedError);

beforeEach(() => {
  mockIsDueForContrivedError.mockReturnValue(Promise.resolve(false));
});

describe('<legacy mode>', () => {
  it('does not inject contrived errors by default', async () => {
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
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, enableContrivedErrors: true }
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
});

describe.skip('<modern mode>', () => {
  it('does not inject contrived errors by default', async () => {
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
      pagesHandler: withLegacyConfig(
        withMiddleware<Options, Context>(legacyNoopHandler, {
          descriptor: '/fake',
          use: [makeMiddleware()],
          options: { legacyMode: true, enableContrivedErrors: true }
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
});
