import {
  ApiError,
  AuthError,
  ClientValidationError,
  ForbiddenError,
  NotFoundError,
  NotImplementedError,
  SanityError,
  ServerValidationError
} from '@-xun/api-strategy/error';

import { testApiHandler } from 'next-test-api-route-handler';
import { toss } from 'toss-expression';

import { withMiddleware } from 'universe+api';
import { makeMiddleware } from 'universe+api:middleware/handle-error.ts';

import {
  expectExceptionsWithMatchingErrors,
  legacyNoopHandler,
  withLegacyConfig,
  withMockedOutput
} from 'testverse:util.ts';

import type { NextApiResponseLike } from 'universe+api';

import type {
  Context,
  LegacyErrorHandler,
  Options
} from 'universe+api:middleware/handle-error.ts';

describe('<legacy mode>', () => {
  it('sends correct HTTP error codes when certain errors occur', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      await expectExceptionsWithMatchingErrors<[Error | string]>(
        [
          [[new ClientValidationError()], '400'],
          [[new AuthError()], '401'],
          [[new ForbiddenError()], '403'],
          [[new NotFoundError()], '404'],
          [[new ServerValidationError()], '500'],
          [[new SanityError()], '500'],
          [[new ApiError()], '500'],
          [[new NotImplementedError()], '501'],
          [[new Error('bad')], '500'], // ? Every other error type should return 500
          [['strange error'], '500'] // ? This too
        ],
        async ([expectedError]) => {
          await testApiHandler({
            rejectOnHandlerError: true,
            pagesHandler: withLegacyConfig(
              withMiddleware(async () => toss(expectedError), {
                descriptor: '/fake',
                use: [],
                useOnError: [makeMiddleware()],
                options: { legacyMode: true }
              })
            ),
            test: async ({ fetch }) =>
              fetch().then((res) => toss(new Error(res.status.toString())))
          });
        }
      );

      expect(errorSpy).toHaveBeenCalled();
    });
  });

  it('throws without calling res.end if response is no longer writable', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: async (rq, rs) => {
        await expect(
          withMiddleware(legacyNoopHandler, {
            descriptor: '/fake',
            use: [
              (_req, res_) => {
                const res = res_ as NextApiResponseLike;
                // eslint-disable-next-line jest/unbound-method
                const end = res.end;
                res.end = ((...args: Parameters<typeof res.end>) => {
                  end(...args);
                  throw new Error('bad bad not good!');
                }) as unknown as typeof res.end;
              }
            ],
            useOnError: [makeMiddleware()],
            options: { legacyMode: true }
          })(rq, rs)
        ).rejects.toMatchObject({ message: 'bad bad not good!' });
      },
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
      }
    });
  });

  it('supports pluggable error handlers', async () => {
    expect.hasAssertions();

    const MyError = class extends Error {};
    const MyUnusedError = class extends Error {};

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware<Options<LegacyErrorHandler<never, never>>, Context>(
        undefined,
        {
          descriptor: '/fake',
          use: [
            () => {
              throw new MyError('bad bad not good');
            }
          ],
          useOnError: [makeMiddleware()],
          options: {
            legacyMode: true,
            errorHandlers: new Map([
              [
                MyUnusedError,
                (_req, res) => {
                  res.status(555).end();
                }
              ],
              [
                MyError,
                (_req, res, errorJson) => {
                  res.status(200).send(errorJson);
                }
              ]
            ])
          }
        }
      ),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
        await expect((await fetch()).json()).resolves.toStrictEqual({
          error: 'bad bad not good'
        });
      }
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware<Options<LegacyErrorHandler<never, never>>, Context>(
        undefined,
        {
          descriptor: '/fake',
          use: [
            () => {
              throw new MyError('bad good not good');
            }
          ],
          useOnError: [makeMiddleware()],
          options: {
            legacyMode: true,
            errorHandlers: new Map([
              [
                // ? Should catch every error
                Error,
                (_req, res, errorJson) => {
                  res.status(201).send(errorJson);
                }
              ]
            ])
          }
        }
      ),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(201);
        await expect((await fetch()).json()).resolves.toStrictEqual({
          error: 'bad good not good'
        });
      }
    });
  });
});

describe.skip('<modern mode>', () => {
  it('sends correct HTTP error codes when certain errors occur', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      await expectExceptionsWithMatchingErrors<[Error | string]>(
        [
          [[new ClientValidationError()], '400'],
          [[new AuthError()], '401'],
          [[new ForbiddenError()], '403'],
          [[new NotFoundError()], '404'],
          [[new ServerValidationError()], '500'],
          [[new SanityError()], '500'],
          [[new ApiError()], '500'],
          [[new NotImplementedError()], '501'],
          [[new Error('bad')], '500'], // ? Every other error type should return 500
          [['strange error'], '500'] // ? This too
        ],
        async ([expectedError]) => {
          await testApiHandler({
            rejectOnHandlerError: true,
            pagesHandler: withLegacyConfig(
              withMiddleware(async () => toss(expectedError), {
                descriptor: '/fake',
                use: [],
                useOnError: [makeMiddleware()],
                options: { legacyMode: true }
              })
            ),
            test: async ({ fetch }) =>
              fetch().then((res) => toss(new Error(res.status.toString())))
          });
        }
      );

      expect(errorSpy).toHaveBeenCalled();
    });
  });

  it('throws without calling res.end if response is no longer writable', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: async (rq, rs) => {
        await expect(
          withMiddleware(legacyNoopHandler, {
            descriptor: '/fake',
            use: [
              (_req, res_) => {
                const res = res_ as NextApiResponseLike;
                // eslint-disable-next-line jest/unbound-method
                const end = res.end;
                res.end = ((...args: Parameters<typeof res.end>) => {
                  end(...args);
                  throw new Error('bad bad not good!');
                }) as unknown as typeof res.end;
              }
            ],
            useOnError: [makeMiddleware()],
            options: { legacyMode: true }
          })(rq, rs)
        ).rejects.toMatchObject({ message: 'bad bad not good!' });
      },
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
      }
    });
  });

  it('supports pluggable error handlers', async () => {
    expect.hasAssertions();

    const MyError = class extends Error {};
    const MyUnusedError = class extends Error {};

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware<Options<LegacyErrorHandler<never, never>>, Context>(
        undefined,
        {
          descriptor: '/fake',
          use: [
            () => {
              throw new MyError('bad bad not good');
            }
          ],
          useOnError: [makeMiddleware()],
          options: {
            legacyMode: true,
            errorHandlers: new Map([
              [
                MyUnusedError,
                (_req, res) => {
                  res.status(555).end();
                }
              ],
              [
                MyError,
                (_req, res, errorJson) => {
                  res.status(200).send(errorJson);
                }
              ]
            ])
          }
        }
      ),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
        await expect((await fetch()).json()).resolves.toStrictEqual({
          error: 'bad bad not good'
        });
      }
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware<Options<LegacyErrorHandler<never, never>>, Context>(
        undefined,
        {
          descriptor: '/fake',
          use: [
            () => {
              throw new MyError('bad good not good');
            }
          ],
          useOnError: [makeMiddleware()],
          options: {
            legacyMode: true,
            errorHandlers: new Map([
              [
                // ? Should catch every error
                Error,
                (_req, res, errorJson) => {
                  res.status(201).send(errorJson);
                }
              ]
            ])
          }
        }
      ),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(201);
        await expect((await fetch()).json()).resolves.toStrictEqual({
          error: 'bad good not good'
        });
      }
    });
  });
});
