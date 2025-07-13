/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { makeNamedError } from '@-xun/error';
import { ErrorMessage } from '@-xun/respond/error';
import { testApiHandler } from 'next-test-api-route-handler';
import { toss } from 'toss-expression';

import { withMiddleware } from 'universe+api';
import { makeMiddleware } from 'universe+api:middleware/handle-error.ts';

import {
  expectExceptionsWithMatchingErrors,
  legacyNoopHandler,
  spreadHandlerAcrossMethods,
  withLegacyConfig,
  withMockedOutput
} from 'testverse:util.ts';

import type { NextApiResponseLike } from 'universe+api';

import type {
  Context,
  LegacyErrorHandler,
  ModernErrorHandler,
  Options
} from 'universe+api:middleware/handle-error.ts';

describe('<legacy mode>', () => {
  it('sends correct HTTP error codes when certain errors occur', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ nodeErrorSpy }) => {
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

      expect(nodeErrorSpy).toHaveBeenCalled();
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
    const { MyOtherError } = makeNamedError(class extends Error {}, 'MyOtherError');

    let threw = false as boolean;

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware<Options<LegacyErrorHandler<any, any>>, Context>(
        undefined,
        {
          descriptor: '/fake',
          use: [
            () => {
              if (!threw) {
                threw = true;
                throw new MyError('bad bad not good');
              }

              throw new MyOtherError('good good not bad');
            }
          ],
          useOnError: [makeMiddleware()],
          options: {
            legacyMode: true,
            errorHandlers: [
              [
                MyOtherError,
                (_req, res, errorJson) => {
                  res.status(555).send(errorJson);
                }
              ],
              [
                MyError,
                (_req, res, errorJson) => {
                  res.status(444).send(errorJson);
                }
              ]
            ]
          }
        }
      ),
      test: async ({ fetch }) => {
        {
          const res = await fetch();
          expect(res.status).toBe(444);

          await expect(res.json()).resolves.toStrictEqual({
            error: 'bad bad not good'
          });
        }

        {
          const res = await fetch();
          expect(res.status).toBe(555);

          await expect(res.json()).resolves.toStrictEqual({
            error: 'good good not bad'
          });
        }
      }
    });

    await withMockedOutput(async ({ nodeErrorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: withMiddleware<Options<LegacyErrorHandler<any, any>>, Context>(
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
              errorHandlers: [
                [
                  // ? Should catch every error
                  Error,
                  (_req, res, errorJson) => {
                    res.status(201).send(errorJson);
                  }
                ]
              ]
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

      expect(nodeErrorSpy).toHaveBeenCalled();
    });
  });

  it('gracefully handles non-writable responses after pluggable error handler runs', async () => {
    expect.hasAssertions();

    const MyError = class extends Error {};

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware<Options<LegacyErrorHandler<any, any>>, Context>(
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
            errorHandlers: [[MyError, (_req, res) => void res.status(567).end()]]
          }
        }
      ),
      test: async ({ fetch }) => {
        {
          const res = await fetch();
          expect(res.status).toBe(567);
          await expect(res.text()).resolves.toBe('');
        }
      }
    });
  });

  it('supports handling a pluggable error as a well-known error', async () => {
    expect.hasAssertions();

    const MyError = class extends Error {};

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withLegacyConfig(
        withMiddleware<Options<LegacyErrorHandler<any, any>>, Context>(undefined, {
          descriptor: '/fake',
          use: [
            () => {
              throw new MyError('bad good not good');
            }
          ],
          useOnError: [makeMiddleware()],
          options: {
            legacyMode: true,
            errorHandlers: [[MyError, () => new AuthError()]]
          }
        })
      ),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(401);
        await expect((await fetch()).json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpUnauthenticated()
        });
      }
    });
  });
});

describe('<modern mode>', () => {
  it('sends correct HTTP error codes when certain errors occur', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ nodeErrorSpy }) => {
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
            appHandler: spreadHandlerAcrossMethods(
              withMiddleware(async () => toss(expectedError), {
                descriptor: '/fake',
                use: [],
                useOnError: [makeMiddleware()]
              }),
              ['GET']
            ),
            test: async ({ fetch }) =>
              fetch().then((res) => toss(new Error(res.status.toString())))
          });
        }
      );

      expect(nodeErrorSpy).toHaveBeenCalled();
    });
  });

  it('supports pluggable error handlers', async () => {
    expect.hasAssertions();

    const UnusedError = class extends Error {};
    const MyError = class extends Error {};
    const { MyOtherError } = makeNamedError(class extends Error {}, 'MyOtherError');

    await withMockedOutput(async ({ nodeErrorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware<Options<ModernErrorHandler<any, any>>, Context>(
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
              errorHandlers: [
                [
                  UnusedError,
                  () => {
                    return new Response(null, { status: 567 });
                  }
                ],
                [
                  MyOtherError,
                  () => {
                    return new Response(null, { status: 555 });
                  }
                ],
                [
                  MyError,
                  (request, _response, _json, ctx) => {
                    ctx.runtime.response = new Response('badness', {
                      headers: { 'y-y-y': request.headers.get('z-z-z')! },
                      status: 444
                    });
                  }
                ]
              ]
            }
          }
        ),
        test: async ({ fetch }) => {
          const res = await fetch({ headers: { 'z-z-z': 'x-x-x' } });

          // ? We didn't return it!
          expect(res.status).toBe(500);
          expect(res.headers.get('y-y-y')).toBe('x-x-x');
        }
      });

      expect(nodeErrorSpy).toHaveBeenCalled();
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: withMiddleware<Options<ModernErrorHandler<any, any>>, Context>(
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
            errorHandlers: [
              [
                // ? Should catch every error
                Error,
                (_request, _response, errorJson) => {
                  return Response.json(errorJson, { status: 444 });
                }
              ]
            ]
          }
        }
      ),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(444);
        await expect((await fetch()).json()).resolves.toStrictEqual({
          error: 'bad good not good'
        });
      }
    });
  });

  it('gracefully handles responses returned after pluggable error handler runs', async () => {
    expect.hasAssertions();

    const MyError = class extends Error {};

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: withMiddleware<Options<ModernErrorHandler<any, any>>, Context>(
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
            errorHandlers: [[MyError, () => new Response(null, { status: 567 })]]
          }
        }
      ),
      test: async ({ fetch }) => {
        {
          const res = await fetch();
          expect(res.status).toBe(567);
          await expect(res.text()).resolves.toBe('');
        }
      }
    });
  });

  it('supports handling a pluggable error as a well-known error', async () => {
    expect.hasAssertions();

    const MyError = class extends Error {};

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: spreadHandlerAcrossMethods(
        withMiddleware<Options<ModernErrorHandler<any, any>>, Context>(undefined, {
          descriptor: '/fake',
          use: [
            () => {
              throw new MyError('bad good not good');
            }
          ],
          useOnError: [makeMiddleware()],
          options: {
            errorHandlers: [[MyError, () => new AuthError()]]
          }
        }),
        ['GET']
      ),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(401);
        await expect((await fetch()).json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpUnauthenticated()
        });
      }
    });
  });
});
