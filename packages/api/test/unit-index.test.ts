/* eslint-disable @typescript-eslint/no-explicit-any */
import { setTimeout as delay } from 'node:timers/promises';

import { testApiHandler } from 'next-test-api-route-handler';
import { toss } from 'toss-expression';

import { isNextApiResponseLike, middlewareFactory, withMiddleware } from 'universe+api';

import {
  legacyNoopHandler,
  modernNoopHandler,
  withDebugEnabled,
  withMockedOutput
} from 'testverse:util.ts';

import type { NextApiResponseLike } from 'universe+api';
import type { ExportedMiddleware, ModernMiddlewareContext } from 'universe+api:types.ts';

const MAX_CONTENT_LENGTH_BYTES = 100_000;
const MAX_CONTENT_LENGTH_BYTES_PLUS_1 = 100_001;

type GenericRecord = Record<string, unknown>;

describe('::withMiddleware', () => {
  describe('(legacy only)', () => {
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

    it('sends 501 if res.end not called by the time handler completes or response not returned', async () => {
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
                    expect(context.runtime.error).toMatchObject({
                      message: 'contrived'
                    });

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

  describe('(modern only)', () => {
    it('sends default 200 if response not returned by the time handler completes', async () => {
      expect.hasAssertions();

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(async () => undefined, {
          descriptor: '/fake',
          use: []
        }),
        test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
      });
    });

    it('handles having runtime.response set to a response with a used body', async () => {
      expect.hasAssertions();

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(
          async () => {
            const draftResponse = new Response('hello, world!', { status: 202 });
            expect(draftResponse.bodyUsed).toBeFalse();
            return draftResponse;
          },
          {
            descriptor: '/fake',
            use: []
          }
        ),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(202);
          await expect(res.text()).resolves.toBe('hello, world!');
        }
      });

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(
          async () => {
            const draftResponse = new Response('hello, world!', { status: 202 });
            await draftResponse.body?.getReader().read();
            expect(draftResponse.bodyUsed).toBeTrue();
            return draftResponse;
          },
          {
            descriptor: '/fake',
            use: []
          }
        ),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(202);
          await expect(res.text()).resolves.toBe('');
        }
      });
    });

    it('handles having the runtime.response body become used while setting a new one', async () => {
      expect.hasAssertions();

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(() => undefined, {
          descriptor: '/fake',
          use: [
            async (_, ctx_) => {
              const ctx = ctx_ as ModernMiddlewareContext<any, any>;

              ctx.runtime.response = new Response('hello, world!', { status: 202 });
              await ctx.runtime.response.body?.getReader().read();
              expect(ctx.runtime.response.bodyUsed).toBeTrue();

              const draftResponse = new Response('goodbye, world!', { status: 266 });
              ctx.runtime.response = draftResponse;
            }
          ]
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(266);
          await expect(res.text()).resolves.toBe('goodbye, world!');
        }
      });
    });

    it('does not allow recovery from an error response status (without passing null first)', async () => {
      expect.hasAssertions();

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(() => undefined, {
          descriptor: '/fake',
          use: [
            async (_, ctx_) => {
              const ctx = ctx_ as ModernMiddlewareContext<any, any>;

              ctx.runtime.response = Response.json({ fail: true }, { status: 404 });
              return new Response('hello, world!', { status: 200 });
            }
          ]
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(404);
          await expect(res.text()).resolves.toBe('hello, world!');
        }
      });
    });

    it('does allow changing from one error response status to another', async () => {
      expect.hasAssertions();

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(() => undefined, {
          descriptor: '/fake',
          use: [
            async (_, ctx_) => {
              const ctx = ctx_ as ModernMiddlewareContext<any, any>;

              ctx.runtime.response = Response.json({ fail: true }, { status: 404 });
              return new Response(null, { status: 504 });
            }
          ]
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(504);
          await expect(res.json()).resolves.toStrictEqual({ fail: true });
        }
      });
    });

    it('allows completely resetting runtime.response by passing null', async () => {
      expect.hasAssertions();

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(undefined, {
          descriptor: '/fake',
          use: [
            (_, ctx) => {
              (ctx as ModernMiddlewareContext<any, any>).runtime.response = new Response(
                null,
                { status: 505 }
              );
            },
            () => new Response(null, { status: 203 })
          ]
        }),
        test: async ({ fetch }) => expect((await fetch()).status).toBe(505)
      });

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(undefined, {
          descriptor: '/fake',
          use: [
            (_, ctx) => {
              (ctx as ModernMiddlewareContext<any, any>).runtime.response = new Response(
                null,
                { status: 505 }
              );
            },
            (_, ctx) => {
              // @ts-expect-error: escape hatch
              (ctx as ModernMiddlewareContext<any, any>).runtime.response = null;
            },
            () => new Response(null, { status: 203 })
          ]
        }),
        test: async ({ fetch }) => expect((await fetch()).status).toBe(203)
      });
    });

    it('supports adding post-handler tasks via runtime.doAfterHandled', async () => {
      expect.hasAssertions();

      let counter = 0;

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(
          async () => {
            expect(counter++).toBe(1);
          },
          {
            descriptor: '/fake',
            use: [
              (_, ctx) => {
                expect(counter++).toBe(0);

                (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterHandled(() => {
                  expect(counter++).toBe(2);
                });
              }
            ]
          }
        ),
        test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
      });

      expect(counter).toBe(3);
    });

    it('supports short-circuiting by returning a response from a runtime.doAfterHandled task', async () => {
      expect.hasAssertions();

      let counter = 0;

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(
          async () => {
            expect(counter++).toBe(1);
          },
          {
            descriptor: '/fake',
            use: [
              (_, ctx) => {
                expect(counter++).toBe(0);

                (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterHandled(() => {
                  expect(counter++).toBe(2);
                });

                (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterHandled(() => {
                  expect(counter++).toBe(3);
                  return new Response(null, { status: 222 });
                });

                (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterHandled(() => {
                  counter++;
                  expect(true).toBe('never reach this point');
                });

                (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterHandled(() => {
                  counter++;
                  expect(true).toBe('never reach this point');
                });
              }
            ]
          }
        ),
        test: async ({ fetch }) => expect((await fetch()).status).toBe(222)
      });

      expect(counter).toBe(4);
    });

    it('ignores failing runtime.doAfterHandled tasks', async () => {
      expect.hasAssertions();

      let counter = 0;

      await withMockedOutput(async ({ errorSpy }) => {
        await testApiHandler({
          rejectOnHandlerError: true,
          appHandler: withMiddleware(
            async () => {
              expect(counter++).toBe(1);
            },
            {
              descriptor: '/fake',
              use: [
                (_, ctx) => {
                  expect(counter++).toBe(0);

                  (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterHandled(
                    () => {
                      expect(counter++).toBe(2);
                    }
                  );

                  (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterHandled(
                    () => {
                      throw new Error('bad bad not good');
                    }
                  );

                  (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterHandled(
                    () => {
                      expect(counter++).toBe(3);
                    }
                  );

                  (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterHandled(
                    () => {
                      throw new Error('bad bad not good');
                    }
                  );
                }
              ]
            }
          ),
          test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
        });

        expect(counter).toBe(4);
        expect(errorSpy).toHaveBeenCalledTimes(2);
      });
    });
  });

  it('supports adding post-sent tasks via runtime.doAfterSent', async () => {
    expect.hasAssertions();

    {
      const { promise: promisedFinish, resolve: resolveFinishPromise } =
        Promise.withResolvers();

      let counter = 0;

      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: withMiddleware(
          async () => {
            expect(counter++).toBe(1);
          },
          {
            descriptor: '/fake',
            options: { awaitTasksAfterSent: false, legacyMode: true },
            use: [
              (_, __, ctx) => {
                expect(counter++).toBe(0);

                ctx!.runtime.doAfterSent(async () => {
                  await delay(100);
                  expect(counter++).toBe(3);
                  resolveFinishPromise(undefined);
                });
              }
            ]
          }
        ),
        test: async ({ fetch }) => {
          expect((await fetch()).status).toBe(501);
          expect(counter++).toBe(2);
        }
      });

      await promisedFinish;
      expect(counter).toBe(4);
    }

    {
      const { promise: promisedFinish, resolve: resolveFinishPromise } =
        Promise.withResolvers();

      let counter = 0;

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(
          async () => {
            expect(counter++).toBe(1);
          },
          {
            descriptor: '/fake',
            options: { awaitTasksAfterSent: false },
            use: [
              (_, ctx) => {
                expect(counter++).toBe(0);

                (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterSent(
                  async () => {
                    await delay(100);
                    expect(counter++).toBe(3);
                    resolveFinishPromise(undefined);
                  }
                );
              }
            ]
          }
        ),
        test: async ({ fetch }) => {
          expect((await fetch()).status).toBe(200);
          expect(counter++).toBe(2);
        }
      });

      await promisedFinish;
      expect(counter).toBe(4);
    }
  });

  it('ignores failing runtime.doAfterSent tasks', async () => {
    expect.hasAssertions();
    const { promise: promisedFinish, resolve: resolveFinishPromise } =
      Promise.withResolvers();
    let counter = 0;

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(
          async () => {
            expect(counter++).toBe(1);
          },
          {
            descriptor: '/fake',
            use: [
              (_, ctx) => {
                expect(counter++).toBe(0);

                (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterSent(() => {
                  expect(counter++).toBe(2);
                });

                (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterSent(() => {
                  throw new Error('bad bad not good');
                });

                (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterSent(() => {
                  expect(counter++).toBe(3);
                });

                (ctx as ModernMiddlewareContext<any, any>).runtime.doAfterSent(() => {
                  resolveFinishPromise(undefined);
                  throw new Error('bad bad not good');
                });
              }
            ]
          }
        ),
        test: async ({ fetch }) => expect((await fetch()).status).toBe(200)
      });

      await promisedFinish;
      expect(counter).toBe(4);
      expect(errorSpy).toHaveBeenCalledTimes(2);
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

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: withMiddleware(
        async (request) => {
          return Response.json(
            {},
            { status: request.headers.get('key') === '1234' ? 200 : 555 }
          );
        },
        {
          descriptor: '/fake',
          use: []
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

    await testApiHandler({
      requestPatcher: (request) => {
        return new Request('ntarh:/?some=url&yes', request);
      },
      rejectOnHandlerError: true,
      appHandler: withMiddleware(
        async (request) => {
          expect(new URL(request.url).searchParams.entries().toArray()).toStrictEqual([
            ['some', 'url'],
            ['yes', '']
          ]);

          return Response.json({}, { status: 200 });
        },
        {
          descriptor: '/fake',
          use: []
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

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: withMiddleware(modernNoopHandler, {
        descriptor: '/fake',
        use: [middleware]
      }),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
        expect(middleware).toHaveBeenCalledTimes(2);
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

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: withMiddleware(modernNoopHandler, {
        descriptor: '/fake',
        use: middleware
      }),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
        middleware.forEach((m) => expect(m).toHaveBeenCalledTimes(2));
      }
    });
  });

  it('runs primary chain middleware then handler', async () => {
    expect.hasAssertions();

    {
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
    }

    {
      const middleware = jest.fn(async function () {
        expect(handler).toHaveBeenCalledTimes(0);
      } as ExportedMiddleware<GenericRecord, GenericRecord>);

      const handler = jest.fn(() => expect(middleware).toHaveBeenCalledTimes(1));

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(handler, {
          descriptor: '/fake',
          use: [middleware]
        }),
        test: async ({ fetch }) => {
          await fetch();
          expect(middleware).toHaveBeenCalledTimes(1);
          expect(handler).toHaveBeenCalledTimes(1);
        }
      });
    }
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

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: withMiddleware(handler, {
        descriptor: '',
        use: []
      }),
      test: async ({ fetch }) => {
        await fetch();
        expect(handler).toHaveBeenCalledTimes(2);
      }
    });
  });

  it('skips running handler if not a function and response not yet flushed', async () => {
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

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: withMiddleware(undefined, {
        descriptor: '/fake',
        use: [(_, res) => void (res as NextApiResponseLike).status(200)],
        options: { legacyMode: true }
      }),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(501);
      }
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: withMiddleware(undefined, {
        descriptor: '/fake',
        use: [() => new Response(null, { status: 200 })]
      }),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(200);
      }
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: withMiddleware(undefined, {
        descriptor: '/fake',
        use: [
          (_, ctx_) => {
            const ctx = ctx_ as ModernMiddlewareContext<any, any>;
            ctx.runtime.response = new Response(null, { status: 200 });
          }
        ]
      }),
      test: async ({ fetch }) => {
        expect((await fetch()).status).toBe(501);
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

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: withMiddleware(undefined, {
        descriptor: '/fake/:path',
        use: [
          (_, context) =>
            Response.json(
              {
                endpoint: (context as ModernMiddlewareContext<any, any>).runtime.endpoint
              },
              { status: 200 }
            )
        ]
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

    {
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
    }

    {
      const handler = jest.fn();

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(handler, {
          descriptor: '/fake',
          use: [
            (_, context) => (context as ModernMiddlewareContext<any, any>).runtime.done()
          ]
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
            appHandler: withMiddleware(handler, {
              descriptor: '/fake',
              use: [() => toss(new Error('bad'))]
            }),
            test: async ({ fetch }) => void (await fetch())
          })
        ).rejects.toMatchObject({ message: 'bad' });

        expect(handler).toHaveBeenCalledTimes(0);
        // ? This is coming from within Next.js itself
        expect(errorSpy).toHaveBeenCalledTimes(1);
      });
    }
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

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: withMiddleware(undefined, {
        descriptor: '/fake',
        use: []
      }),
      test: async ({ fetch }) => expect((await fetch()).status).toBe(501)
    });
  });

  it('only populates runtime.error for error handling middleware (and not primary)', async () => {
    expect.hasAssertions();

    const error = new Error('bad stuff happened');

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        // ? Failing expectation exceptions will bubble up
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
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(500);
        }
      });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        // ? Failing expectation exceptions will bubble up
        rejectOnHandlerError: true,
        appHandler: withMiddleware(modernNoopHandler, {
          descriptor: '/fake',
          use: [
            (_, context) =>
              expect(
                (context as ModernMiddlewareContext<any, any>).runtime.error
              ).toBeUndefined(),
            (_, context) =>
              expect(
                (context as ModernMiddlewareContext<any, any>).runtime.error
              ).toBeUndefined(),
            () => toss(error)
          ],
          useOnError: [
            (_, context) =>
              expect((context as ModernMiddlewareContext<any, any>).runtime.error).toBe(
                error
              ),
            (_, context) =>
              expect((context as ModernMiddlewareContext<any, any>).runtime.error).toBe(
                error
              )
          ]
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(500);
        }
      });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('runs one middleware in error handling chain on error in primary chain', async () => {
    expect.hasAssertions();

    const middleware = jest.fn();

    await withMockedOutput(async ({ errorSpy }) => {
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

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(modernNoopHandler, {
          descriptor: '/fake',
          use: [() => toss(new Error('error'))],
          useOnError: [middleware, () => new Response()]
        }),
        test: async ({ fetch }) => {
          await fetch();
          expect(middleware).toHaveBeenCalledTimes(2);
        }
      });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('runs multiple middleware in error handling chain on error in primary chain', async () => {
    expect.hasAssertions();

    const middleware = [
      jest.fn(),
      jest.fn(),
      function (_, res) {
        return isNextApiResponseLike(res) ? res.end() : new Response();
      } as ExportedMiddleware<GenericRecord, GenericRecord>
    ];

    await withMockedOutput(async ({ errorSpy }) => {
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

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(modernNoopHandler, {
          descriptor: '/fake',
          use: [() => toss(new Error('error'))],
          useOnError: middleware
        }),
        test: async ({ fetch }) => {
          await fetch();
          middleware.slice(0, -1).forEach((m) => expect(m).toHaveBeenCalledTimes(2));
        }
      });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('runs one middleware in error handling chain on error in handler', async () => {
    expect.hasAssertions();

    const middleware = jest.fn();

    await withMockedOutput(async ({ errorSpy }) => {
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

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(() => toss(new Error('error')), {
          descriptor: '/fake',
          use: [],
          useOnError: [middleware, () => new Response()]
        }),
        test: async ({ fetch }) => {
          await fetch();
          expect(middleware).toHaveBeenCalledTimes(2);
        }
      });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('runs multiple middleware in error handling chain on error in handler', async () => {
    expect.hasAssertions();

    const middleware = [
      jest.fn(),
      jest.fn(),
      async function (_, res) {
        return isNextApiResponseLike(res) ? res.end() : new Response();
      } as ExportedMiddleware<GenericRecord, GenericRecord>
    ];

    await withMockedOutput(async ({ errorSpy }) => {
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

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(() => toss(new Error('error')), {
          descriptor: '/fake',
          use: [],
          useOnError: middleware
        }),
        test: async ({ fetch }) => {
          await fetch();
          middleware.slice(0, -1).forEach((m) => expect(m).toHaveBeenCalledTimes(2));
        }
      });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('skips remaining middleware if chain is aborted and aborts chain if runtime.done called', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      const middleware = jest.fn();

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

    await withMockedOutput(async ({ errorSpy }) => {
      const middleware = jest.fn();

      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(modernNoopHandler, {
          descriptor: '/fake',
          use: [
            (_, context) =>
              (context as ModernMiddlewareContext<any, any>).runtime.done(),
            middleware,
            middleware
          ],
          useOnError: [
            (_, context) =>
              (context as ModernMiddlewareContext<any, any>).runtime.done(),
            middleware,
            middleware
          ]
        }),
        test: async ({ fetch }) => {
          await fetch();
          expect(middleware).toHaveBeenCalledTimes(0);
        }
      });

      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          appHandler: withMiddleware(modernNoopHandler, {
            descriptor: '/fake',
            use: [() => toss(new Error('bad')), middleware, middleware],
            useOnError: [() => toss(new Error('bad')), middleware, middleware]
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

    await withMockedOutput(async ({ errorSpy }) => {
      await expect(
        testApiHandler({
          rejectOnHandlerError: true,
          appHandler: withMiddleware(undefined, {
            descriptor: '/fake',
            use: [() => toss(new Error('bad'))],
            useOnError: [() => toss(new Error('worse'))]
          }),
          test: async ({ fetch }) => void (await fetch())
        })
      ).rejects.toMatchObject({ message: 'worse' });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('responds with HTTP 500 if no error handling middleware available', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: withMiddleware(undefined, {
          descriptor: '/fake',
          use: [() => toss(new Error('bad'))],
          useOnError: [],
          options: { legacyMode: true }
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(500);
        }
      });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(undefined, {
          descriptor: '/fake',
          use: [() => toss(new Error('bad'))],
          useOnError: []
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(500);
        }
      });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('responds with HTTP 500 if res.end not called by the time error handling chain completes', async () => {
    expect.hasAssertions();

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: withMiddleware(undefined, {
          descriptor: '/fake',
          use: [() => toss(new Error('bad'))],
          useOnError: [() => undefined],
          options: { legacyMode: true }
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          // ? No error handler handled the error, so Next.js will
          expect(res.status).toBe(500);
        }
      });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    await withMockedOutput(async ({ errorSpy }) => {
      await testApiHandler({
        rejectOnHandlerError: true,
        appHandler: withMiddleware(undefined, {
          descriptor: '/fake',
          use: [() => toss(new Error('bad'))],
          useOnError: [() => undefined]
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          // ? No error handler handled the error, so Next.js will
          expect(res.status).toBe(500);
        }
      });

      // ? This is coming from within Next.js itself
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('makes runtime control functions noops if chain completes', async () => {
    expect.hasAssertions();

    const doneWarning = expect.stringContaining(
      'already finished executing; calling runtime.done() at this point is a noop'
    );

    const abortedWarning = expect.stringContaining(
      'runtime.done: chain already aborted; calling runtime.done() at this point is a noop'
    );

    await withDebugEnabled(async () => {
      await withMockedOutput(async ({ nodeErrorSpy, errorSpy }) => {
        let done: () => void;

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
            expect(errorSpy).toHaveBeenCalled();
          }
        });
      });

      await withMockedOutput(async ({ nodeErrorSpy, errorSpy }) => {
        let done: () => void;

        await testApiHandler({
          rejectOnHandlerError: true,
          appHandler: withMiddleware(
            async () => {
              expect(nodeErrorSpy).not.toHaveBeenCalledWith(doneWarning);

              done();
              expect(nodeErrorSpy).toHaveBeenCalledWith(doneWarning);

              throw new Error('badness');
            },
            {
              options: { callDoneOnEnd: false },
              descriptor: '/fake',
              use: [
                (_, context) => {
                  done = (context as ModernMiddlewareContext<any, any>).runtime.done;
                }
              ],
              useOnError: [
                (_, context) => {
                  expect(
                    (context as ModernMiddlewareContext<any, any>).runtime.error
                  ).toMatchObject({ message: 'badness' });

                  done = (context as ModernMiddlewareContext<any, any>).runtime.done;
                  return new Response();
                }
              ]
            }
          ),
          test: async ({ fetch }) => {
            await fetch();

            nodeErrorSpy.mockClear();

            done();
            expect(nodeErrorSpy).toHaveBeenCalledWith(abortedWarning);
            expect(errorSpy).toHaveBeenCalled();
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

    await withDebugEnabled(async () => {
      await withMockedOutput(async ({ nodeErrorSpy, errorSpy }) => {
        let done: () => void = () => toss(new Error('test failed'));

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

      await withMockedOutput(async ({ nodeErrorSpy, errorSpy }) => {
        let done: () => void = () => toss(new Error('test failed'));

        await expect(
          testApiHandler({
            rejectOnHandlerError: true,
            appHandler: withMiddleware(undefined, {
              descriptor: '/fake',
              use: [
                (_, context) => {
                  done = (context as ModernMiddlewareContext<any, any>).runtime.done;
                  throw new Error('aborted');
                }
              ],
              useOnError: [
                async (_, context) => {
                  expect(nodeErrorSpy).not.toHaveBeenCalledWith(doneWarning);

                  done();
                  expect(nodeErrorSpy).toHaveBeenCalledWith(doneWarning);

                  done = (context as ModernMiddlewareContext<any, any>).runtime.done;
                  throw new Error('aborted again');
                }
              ]
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
              'bad' as any,
              null as any,
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

    await withDebugEnabled(async () => {
      await withMockedOutput(async ({ nodeErrorSpy }) => {
        await testApiHandler({
          rejectOnHandlerError: true,
          appHandler: withMiddleware(undefined, {
            descriptor: '/fake',
            use: [
              'bad' as any,
              null as any,
              {} as any,
              () => new Response(null, { status: 403 })
            ]
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
});

describe('::middlewareFactory', () => {
  describe('(legacy only)', () => {
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
          prependUse: [
            (_, res) => (res as NextApiResponseLike).status(201).send({ a: 1 })
          ]
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
          prependUseOnError: [(_, res) => void (res as NextApiResponseLike).status(444)],
          appendUseOnError: [(_, res) => (res as NextApiResponseLike).send({ c: 1 })]
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(444);
          await expect(res.json()).resolves.toStrictEqual({ c: 1 });
        }
      });
    });
  });

  describe('(modern only)', () => {
    type MyMiddlewareOptions = { customOption: boolean };
    const customOption = true;

    const myMiddleware: ExportedMiddleware<MyMiddlewareOptions> = (_, ctx) => {
      // ? The innards of these exported middleware can be janky. The middleware
      // ? runner will never know :)
      const {
        options: { customOption }
      } = ctx as ModernMiddlewareContext<any, any>;

      return Response.json(customOption, { status: 200 });
    };

    it('returns a pre-configured withMiddleware instance', async () => {
      expect.hasAssertions();

      const appHandler = middlewareFactory<MyMiddlewareOptions>({
        use: [myMiddleware],
        options: { customOption }
      })(undefined, {
        descriptor: '/fake'
      });

      await testApiHandler({
        appHandler,
        test: async ({ fetch }) => {
          await expect((await fetch()).json()).resolves.toStrictEqual(customOption);
        }
      });
    });

    it('handles appending and prepending to middleware chains', async () => {
      expect.hasAssertions();

      await testApiHandler({
        appHandler: middlewareFactory<MyMiddlewareOptions>({
          use: [myMiddleware],
          options: { customOption }
        })(undefined, {
          descriptor: '/fake',
          prependUse: [() => Response.json({ a: 1 }, { status: 201 })]
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(201);
          await expect(res.json()).resolves.toStrictEqual({ a: 1 });
        }
      });

      await testApiHandler({
        appHandler: middlewareFactory({
          use: [
            (_, ctx) => {
              (ctx as ModernMiddlewareContext<any, any>).runtime.response = new Response(
                null,
                { status: 202 }
              );
            }
          ]
        })(undefined, {
          descriptor: '/fake',
          appendUse: [
            (_, ctx) =>
              Response.json(
                { b: 1 },
                {
                  status: (ctx as ModernMiddlewareContext<any, any>).runtime.response
                    .status
                }
              )
          ]
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(202);
          await expect(res.json()).resolves.toStrictEqual({ b: 1 });
        }
      });

      await testApiHandler({
        appHandler: middlewareFactory<MyMiddlewareOptions>({
          use: [myMiddleware],
          options: { customOption }
        })(undefined, {
          descriptor: '/fake',
          prependUse: [() => toss(new Error('bad bad not good'))],
          prependUseOnError: [
            (_, ctx) => {
              (ctx as ModernMiddlewareContext<any, any>).runtime.response = new Response(
                null,
                { status: 444 }
              );
            }
          ],
          appendUseOnError: [() => Response.json({ c: 1 })]
        }),
        test: async ({ fetch }) => {
          const res = await fetch();
          expect(res.status).toBe(444);
          await expect(res.json()).resolves.toStrictEqual({ c: 1 });
        }
      });
    });
  });
});
