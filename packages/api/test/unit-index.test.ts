import { testApiHandler } from 'next-test-api-route-handler';
import { toss } from 'toss-expression';

import { middlewareFactory, withMiddleware } from 'universe+api';

import {
  legacyNoopHandler,
  withDebugEnabled,
  withMockedOutput
} from 'testverse:util.ts';

import type { NextApiResponseLike } from 'universe+api';
import type { ExportedMiddleware } from 'universe+api:types.ts';

const MAX_CONTENT_LENGTH_BYTES = 100_000;
const MAX_CONTENT_LENGTH_BYTES_PLUS_1 = 100_001;

type GenericRecord = Record<string, unknown>;

describe('::withMiddleware', () => {
  it('rejects requests that are too big when exporting config (next.js)', async () => {
    expect.hasAssertions();

    const pagesHandler = withMiddleware(legacyNoopHandler, {
      descriptor: '/fake',
      use: [],
      options: { legacyMode: true }
    });

    // ? Simulate an imported handler with exported configuration
    (pagesHandler as typeof pagesHandler & { config: object }).config = {
      api: {
        bodyParser: {
          get sizeLimit() {
            return MAX_CONTENT_LENGTH_BYTES;
          }
        }
      }
    };

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler,
      test: async ({ fetch }) => {
        await expect(
          fetch({
            method: 'POST',
            body: 'x'.repeat(MAX_CONTENT_LENGTH_BYTES_PLUS_1)
          }).then((r) => r.status)
        ).resolves.toBe(413);
      }
    });
  });

  it('lowercases headers automatically', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(
        async (req, res) => {
          res.status(req.headers.key === '1234' ? 200 : 555).send({});
        },
        {
          descriptor: '/fake',
          use: [],
          options: { legacyMode: true }
        }
      ),
      test: async ({ fetch }) =>
        expect((await fetch({ headers: { KEY: '1234' } })).status).toBe(200)
    });
  });

  it('parses url parameters', async () => {
    expect.hasAssertions();

    await testApiHandler({
      requestPatcher: (req) => {
        req.url = '/?some=url&yes';
      },
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(
        async (req, res) => {
          expect(req.query).toStrictEqual({ some: 'url', yes: '' });
          res.status(200).send({});
        },
        {
          descriptor: '/fake',
          use: [],
          options: { legacyMode: true }
        }
      ),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
      }
    });
  });

  it('runs one middleware in primary chain', async () => {
    expect.hasAssertions();

    const middleware = jest.fn();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(legacyNoopHandler, {
        descriptor: '/fake',
        use: [middleware],
        options: { legacyMode: true }
      }),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
        expect(middleware).toHaveBeenCalledTimes(1);
      }
    });
  });

  it('runs multiple middleware in primary chain', async () => {
    expect.hasAssertions();

    const middleware = [jest.fn(), jest.fn()];

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(legacyNoopHandler, {
        descriptor: '/fake',
        use: middleware,
        options: { legacyMode: true }
      }),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
        middleware.forEach((m) => expect(m).toHaveBeenCalledTimes(1));
      }
    });
  });

  it('runs primary chain middleware then handler', async () => {
    expect.hasAssertions();

    const middleware = jest.fn(async function () {
      expect(handler).toHaveBeenCalledTimes(0);
    } as ExportedMiddleware<GenericRecord, GenericRecord>);

    const handler = jest.fn(() => expect(middleware).toHaveBeenCalledTimes(1));

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(handler, {
        descriptor: '/fake',
        use: [middleware],
        options: { legacyMode: true }
      }),
      test: async ({ fetch }) => {
        await fetch();
        expect(middleware).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledTimes(1);
      }
    });
  });

  it('runs handler even if no middleware used', async () => {
    expect.hasAssertions();

    const handler = jest.fn();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(handler, {
        descriptor: '',
        use: [],
        options: { legacyMode: true }
      }),
      test: async ({ fetch }) => {
        await fetch();
        expect(handler).toHaveBeenCalledTimes(1);
      }
    });
  });

  it('skips running handler if not a function', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(undefined, {
        descriptor: '/fake',
        use: [(_, res) => void (res as NextApiResponseLike).status(200).end()],
        options: { legacyMode: true }
      }),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
      }
    });
  });

  it('populates runtime.endpoint with endpoint metadata if available', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(undefined, {
        descriptor: '/fake/:path',
        use: [
          (_, res, context) =>
            (res as NextApiResponseLike)
              .status(200)
              .send({ endpoint: context?.runtime.endpoint })
        ],
        options: { legacyMode: true }
      }),
      test: async ({ fetch }) => {
        await expect((await fetch()).json()).resolves.toStrictEqual({
          endpoint: {
            descriptor: '/fake/:path'
          }
        });
      }
    });
  });

  it('skips running handler if primary chain was aborted', async () => {
    expect.hasAssertions();

    const handler = jest.fn();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(handler, {
        descriptor: '/fake',
        use: [(_, __, context) => context?.runtime.done()],
        options: { legacyMode: true }
      }),
      test: async ({ fetch }) => {
        await fetch();
        expect(handler).toHaveBeenCalledTimes(0);
      }
    });

    await withMockedOutput(async ({ errorSpy }) => {
      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(handler, {
            descriptor: '/fake',
            use: [() => toss(new Error('bad'))],
            options: { legacyMode: true }
          }),
          test: async ({ fetch }) => void (await fetch())
        })
      ).rejects.toMatchObject({ message: 'bad' });

      expect(handler).toHaveBeenCalledTimes(0);
      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('sends 501 if handler is undefined', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(undefined, {
        descriptor: '/fake',
        use: [],
        options: { legacyMode: true }
      }),
      test: async ({ fetch }) => expect((await fetch()).status).toBe(501)
    });
  });

  it('sends 501 if res.end not called by the time handler completes', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(async () => undefined, {
        descriptor: '/fake',
        use: [],
        options: { legacyMode: true }
      }),
      test: async ({ fetch }) => expect((await fetch()).status).toBe(501)
    });
  });

  it('only populates runtime.error for error handling middleware (and not primary)', async () => {
    expect.hasAssertions();

    const error = new Error('bad stuff happened');

    await withMockedOutput(async ({ errorSpy }) => {
      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(legacyNoopHandler, {
            descriptor: '/fake',
            use: [
              (_, __, context) => expect(context?.runtime.error).toBeUndefined(),
              (_, __, context) => expect(context?.runtime.error).toBeUndefined(),
              () => toss(error)
            ],
            useOnError: [
              (_, __, context) => expect(context?.runtime.error).toBe(error),
              (_, __, context) => expect(context?.runtime.error).toBe(error)
            ],
            options: { legacyMode: true }
          }),
          test: async ({ fetch }) => void (await fetch())
        })
      ).toReject();

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('runs one middleware in error handling chain on error in primary chain', async () => {
    expect.hasAssertions();

    const middleware = jest.fn();

    await withMockedOutput(async () => {
      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: withMiddleware(legacyNoopHandler, {
          descriptor: '/fake',
          use: [() => toss(new Error('error'))],
          useOnError: [middleware, (_, res) => void (res as NextApiResponseLike).end()],
          options: { legacyMode: true }
        }),
        test: async ({ fetch }) => {
          await fetch();
          expect(middleware).toHaveBeenCalledTimes(1);
        }
      });
    });
  });

  it('runs multiple middleware in error handling chain on error in primary chain', async () => {
    expect.hasAssertions();

    const middleware = [
      jest.fn(),
      jest.fn(),
      function (_, res) {
        (res as NextApiResponseLike).end();
      } as ExportedMiddleware<GenericRecord, GenericRecord>
    ];

    await withMockedOutput(async () => {
      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: withMiddleware(legacyNoopHandler, {
          descriptor: '/fake',
          use: [() => toss(new Error('error'))],
          useOnError: middleware,
          options: { legacyMode: true }
        }),
        test: async ({ fetch }) => {
          await fetch();
          middleware.slice(0, -1).forEach((m) => expect(m).toHaveBeenCalledTimes(1));
        }
      });
    });
  });

  it('runs one middleware in error handling chain on error in handler', async () => {
    expect.hasAssertions();

    const middleware = jest.fn();

    await withMockedOutput(async () => {
      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: withMiddleware(() => toss(new Error('error')), {
          descriptor: '/fake',
          use: [],
          useOnError: [middleware, (_, res) => void (res as NextApiResponseLike).end()],
          options: { legacyMode: true }
        }),
        test: async ({ fetch }) => {
          await fetch();
          expect(middleware).toHaveBeenCalledTimes(1);
        }
      });
    });
  });

  it('runs multiple middleware in error handling chain on error in handler', async () => {
    expect.hasAssertions();

    const middleware = [
      jest.fn(),
      jest.fn(),
      async function (_, res) {
        (res as NextApiResponseLike).end();
      } as ExportedMiddleware<GenericRecord, GenericRecord>
    ];

    await withMockedOutput(async () => {
      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: withMiddleware(() => toss(new Error('error')), {
          descriptor: '/fake',
          use: [],
          useOnError: middleware,
          options: { legacyMode: true }
        }),
        test: async ({ fetch }) => {
          await fetch();
          middleware.slice(0, -1).forEach((m) => expect(m).toHaveBeenCalledTimes(1));
        }
      });
    });
  });

  it('skips remaining middleware if chain is aborted and aborts chain if runtime.done called', async () => {
    expect.hasAssertions();

    const middleware = jest.fn();

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: withMiddleware(legacyNoopHandler, {
          descriptor: '/fake',
          use: [(_, __, context) => context?.runtime.done(), middleware, middleware],
          useOnError: [
            (_, __, context) => context?.runtime.done(),
            middleware,
            middleware
          ],
          options: { legacyMode: true }
        }),
        test: async ({ fetch }) => {
          await fetch();
          expect(middleware).toHaveBeenCalledTimes(0);
        }
      });

      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(legacyNoopHandler, {
            descriptor: '/fake',
            use: [() => toss(new Error('bad')), middleware, middleware],
            useOnError: [() => toss(new Error('bad')), middleware, middleware],
            options: { legacyMode: true }
          }),
          test: async ({ fetch }) => void (await fetch())
        })
      ).toReject();

      expect(middleware).toHaveBeenCalledTimes(0);
      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('throws on error in error handling chain', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(undefined, {
            descriptor: '/fake',
            use: [() => toss(new Error('bad'))],
            useOnError: [() => toss(new Error('worse'))],
            options: { legacyMode: true }
          }),
          test: async ({ fetch }) => void (await fetch())
        })
      ).rejects.toMatchObject({ message: 'worse' });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('throws on error in primary chain if no error handling middleware available', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(undefined, {
            descriptor: '/fake',
            use: [() => toss(new Error('bad'))],
            useOnError: [],
            options: { legacyMode: true }
          }),
          test: async ({ fetch }) => void (await fetch())
        })
      ).rejects.toMatchObject({ message: 'bad' });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('throws if res.end not called by the time error handling chain completes', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(undefined, {
            descriptor: '/fake',
            use: [() => toss(new Error('bad'))],
            useOnError: [() => undefined],
            options: { legacyMode: true }
          }),
          test: async ({ fetch }) => void (await fetch())
        })
      ).rejects.toMatchObject({ message: 'bad' });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('makes runtime control functions noops if chain completes', async () => {
    expect.hasAssertions();

    const doneWarning = expect.stringContaining(
      'already finished executing; calling runtime.done() at this point is a noop'
    );

    let done: () => void;

    await withDebugEnabled(async () => {
      await withMockedOutput(async ({ nodeErrorSpy }) => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(
            async () => {
              expect(nodeErrorSpy).not.toHaveBeenCalledWith(doneWarning);

              done();
              expect(nodeErrorSpy).toHaveBeenCalledWith(doneWarning);

              throw new Error('badness');
            },
            {
              options: { callDoneOnEnd: false, legacyMode: true },

              descriptor: '/fake',
              use: [
                (_req, _res, context) => {
                  done = context?.runtime.done || (() => toss(new Error('fail')));
                }
              ],
              useOnError: [
                (_req, res, context) => {
                  expect(context?.runtime.error).toMatchObject({ message: 'badness' });

                  done = context?.runtime.done || (() => toss(new Error('fail')));
                  (res as NextApiResponseLike).end();
                }
              ]
            }
          ),
          test: async ({ fetch }) => {
            await fetch();

            nodeErrorSpy.mockClear();

            done();
            expect(nodeErrorSpy).toHaveBeenCalledWith(doneWarning);
          }
        });
      });
    });
  });

  it('makes runtime control functions noops if chain aborts', async () => {
    expect.hasAssertions();

    const doneWarning = expect.stringContaining(
      'already aborted; calling runtime.done() at this point is a noop'
    );

    let done: () => void;

    await withDebugEnabled(async () => {
      await withMockedOutput(async ({ nodeErrorSpy, errorSpy }) => {
        await expect(
          testApiHandler({
            rejectOnHandlerError: true,
            pagesHandler: withMiddleware(undefined, {
              descriptor: '/fake',
              use: [
                (_req, _res, context) => {
                  done = context?.runtime.done || (() => toss(new Error('fail')));
                  throw new Error('aborted');
                }
              ],
              useOnError: [
                async (_req, _res, context) => {
                  expect(nodeErrorSpy).not.toHaveBeenCalledWith(doneWarning);

                  done();
                  expect(nodeErrorSpy).toHaveBeenCalledWith(doneWarning);

                  done = context?.runtime.done || (() => toss(new Error('fail')));

                  throw new Error('aborted again');
                }
              ],
              options: { legacyMode: true }
            }),
            test: async ({ fetch }) => void (await fetch())
          })
        ).rejects.toMatchObject({ message: 'aborted again' });

        nodeErrorSpy.mockClear();

        done();
        expect(nodeErrorSpy).toHaveBeenCalledWith(doneWarning);

        // ? This is coming from within Next.js itself
        expect(errorSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('skips non-function middleware in chain', async () => {
    expect.hasAssertions();

    await withDebugEnabled(async () => {
      await withMockedOutput(async ({ nodeErrorSpy }) => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(undefined, {
            descriptor: '/fake',
            use: [
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              'bad' as any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              null as any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {} as any,
              (_, res) => void (res as NextApiResponseLike).status(403).end()
            ],
            options: { legacyMode: true }
          }),
          test: async ({ fetch }) => {
            expect((await fetch()).status).toBe(403);
            expect(nodeErrorSpy).toHaveBeenCalledWith(
              expect.stringContaining('skipping execution of non-function item in chain')
            );
          }
        });
      });
    });
  });

  it('calls runtime.done on res.end only if options.callDoneOnEnd is true', async () => {
    expect.hasAssertions();

    const middleware = jest.fn();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(undefined, {
        descriptor: '/fake',
        use: [
          (_, res) => void (res as NextApiResponseLike).status(404).end(),
          middleware
        ],
        options: { legacyMode: true, callDoneOnEnd: false }
      }),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(404);
        expect(middleware).toHaveBeenCalledTimes(1);
      }
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(undefined, {
        descriptor: '/fake',
        use: [
          (_, res) => void (res as NextApiResponseLike).status(403).end(),
          middleware
        ],
        options: { legacyMode: true, callDoneOnEnd: true }
      }),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(403);
        expect(middleware).toHaveBeenCalledTimes(1);
      }
    });
  });

  it('calls runtime.done on res.end only if chain was not aborted', async () => {
    expect.hasAssertions();

    const skippedMessage = expect.stringContaining('skipped calling runtime.done');

    await withDebugEnabled(async () => {
      await withMockedOutput(async ({ nodeErrorSpy }) => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(undefined, {
            descriptor: '/fake',
            use: [
              async (_, res, context) => {
                if (context?.runtime.done) {
                  context.runtime.done();
                  expect(nodeErrorSpy).not.toHaveBeenCalledWith(skippedMessage);
                  void (res as NextApiResponseLike).status(404).end();
                  expect(nodeErrorSpy).toHaveBeenCalledWith(skippedMessage);
                }
              }
            ],
            options: { legacyMode: true }
          }),
          test: async ({ fetch }) => {
            expect((await fetch()).status).toBe(404);
          }
        });

        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(undefined, {
            descriptor: '/fake',
            use: [
              async () => {
                throw new Error('contrived');
              }
            ],
            useOnError: [
              async (_, res, context) => {
                if (context?.runtime.done) {
                  expect(context.runtime.error).toMatchObject({ message: 'contrived' });

                  context.runtime.done();

                  nodeErrorSpy.mockClear();
                  expect(nodeErrorSpy).not.toHaveBeenCalledWith(skippedMessage);

                  (res as NextApiResponseLike).status(404).end();
                  expect(nodeErrorSpy).toHaveBeenCalledWith(skippedMessage);
                }
              }
            ],
            options: { legacyMode: true }
          }),
          test: async ({ fetch }) => {
            expect((await fetch()).status).toBe(404);
          }
        });
      });
    });
  });

  it('calls runtime.done on res.end only if chain has not already completed', async () => {
    expect.hasAssertions();

    const skippedMessage = expect.stringContaining('skipped calling runtime.done');

    await withDebugEnabled(async () => {
      await withMockedOutput(async ({ nodeErrorSpy }) => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(
            async (_, res) => {
              expect(nodeErrorSpy).not.toHaveBeenCalledWith(skippedMessage);
              res.status(404).end();
              expect(nodeErrorSpy).toHaveBeenCalledWith(skippedMessage);
            },
            {
              descriptor: '/fake',
              use: [],
              options: { legacyMode: true }
            }
          ),
          test: async ({ fetch }) => {
            expect((await fetch()).status).toBe(404);
          }
        });
      });
    });
  });

  it('does not call runtime.done on res.end if response was already sent', async () => {
    expect.hasAssertions();

    const skippedMessage = expect.stringContaining('skipped calling runtime.done');

    await withDebugEnabled(async () => {
      await withMockedOutput(async ({ nodeErrorSpy }) => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withMiddleware(
            async (_, res) => {
              expect(nodeErrorSpy).not.toHaveBeenCalledWith(skippedMessage);
              res.status(404).end();
              expect(nodeErrorSpy).toHaveBeenCalledWith(skippedMessage);
              nodeErrorSpy.mockClear();
              expect(nodeErrorSpy).not.toHaveBeenCalledWith(skippedMessage);
              res.status(404).end();
              expect(nodeErrorSpy).not.toHaveBeenCalledWith(skippedMessage);
            },
            {
              descriptor: '/fake',
              use: [],
              options: { legacyMode: true }
            }
          ),
          test: async ({ fetch }) => {
            expect((await fetch()).status).toBe(404);
          }
        });
      });
    });
  });
});

describe('::middlewareFactory', () => {
  type MyMiddlewareOptions = { customOption: boolean };
  const customOption = true;

  const myMiddleware: ExportedMiddleware<MyMiddlewareOptions> = (_, res, ctx) => {
    // ? The innards of these exported middleware can be janky. The middleware
    // ? runner will never know :)
    const {
      options: { customOption }
    } = ctx!;

    (res as NextApiResponseLike).status(200).send(customOption);
  };

  it('returns a pre-configured withMiddleware instance', async () => {
    expect.hasAssertions();

    const pagesHandler = middlewareFactory<MyMiddlewareOptions>({
      use: [myMiddleware],
      options: { customOption, legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    await testApiHandler({
      pagesHandler,
      test: async ({ fetch }) => {
        await expect((await fetch()).json()).resolves.toStrictEqual(customOption);
      }
    });
  });

  it('handles appending and prepending to middleware chains', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: middlewareFactory<MyMiddlewareOptions>({
        use: [myMiddleware],
        options: { customOption, legacyMode: true }
      })(undefined, {
        descriptor: '/fake',
        prependUse: [(_, res) => (res as NextApiResponseLike).status(201).send({ a: 1 })]
      }),
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(201);
        await expect(res.json()).resolves.toStrictEqual({ a: 1 });
      }
    });

    await testApiHandler({
      pagesHandler: middlewareFactory({
        use: [(_, res) => void (res as NextApiResponseLike).status(202)],
        options: { legacyMode: true }
      })(undefined, {
        descriptor: '/fake',
        appendUse: [(_, res) => (res as NextApiResponseLike).send({ b: 1 })]
      }),
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(202);
        await expect(res.json()).resolves.toStrictEqual({ b: 1 });
      }
    });

    await testApiHandler({
      pagesHandler: middlewareFactory<MyMiddlewareOptions>({
        use: [myMiddleware],
        options: { customOption, legacyMode: true }
      })(undefined, {
        descriptor: '/fake',
        prependUse: [() => toss(new Error('bad bad not good'))],
        prependUseOnError: [(_, res) => void (res as NextApiResponseLike).status(203)],
        appendUseOnError: [(_, res) => (res as NextApiResponseLike).send({ c: 1 })]
      }),
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(203);
        await expect(res.json()).resolves.toStrictEqual({ c: 1 });
      }
    });
  });
});
