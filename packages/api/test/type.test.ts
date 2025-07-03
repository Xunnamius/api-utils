/* eslint-disable @typescript-eslint/no-explicit-any */
// * These tests ensure the exported types under test function as expected.

import { describe, expect, it } from 'tstyche';

import { middlewareFactory, withMiddleware } from 'universe+api';
import { makeMiddleware as makeAuthMiddleware } from 'universe+api:middleware/auth-request.ts';
import { makeMiddleware as makeLimitsMiddleware } from 'universe+api:middleware/enforce-limits.ts';
import { makeMiddleware as makeErrorHandlingMiddleware } from 'universe+api:middleware/handle-error.ts';

import type {
  NextApiRequestLike,
  NextApiResponseLike
} from 'multiverse+shared:next-like.ts';

import type { Options as AuthMiddlewareOptions } from 'universe+api:middleware/auth-request.ts';
import type { Options as LimitsMiddlewareOptions } from 'universe+api:middleware/enforce-limits.ts';

import type {
  LegacyErrorHandler,
  ModernErrorHandler,
  Options as ErrorHandlingMiddlewareOptions
} from 'universe+api:middleware/handle-error.ts';

import type {
  ExportedMiddleware,
  LegacyApiHandler,
  LegacyMiddlewareContext,
  ModernApiHandler,
  ModernMiddlewareContext
} from 'universe+api:types.ts';

import type { JsonError } from 'universe+respond';

type MyMiddlewareOptions = { customOption: boolean };

const myMiddleware: ExportedMiddleware<MyMiddlewareOptions> = (_, res, ctx) => {
  // ? The innards of these exported middleware can be janky. The middleware
  // ? runner will never know :)
  const {
    options: { customOption }
  } = ctx!;

  (res as NextApiResponseLike).status(200).send(customOption);
};

const myPartialMiddleware: ExportedMiddleware<MyMiddlewareOptions> = (_, res, ctx) => {
  const {
    options: { customOption }
  } = ctx!;

  (res as NextApiResponseLike).status(200).send(customOption);
};

describe('::withMiddleware', () => {
  it('supports legacy and modern middleware call signatures', async () => {
    {
      const middleware = withMiddleware(() => undefined, {
        descriptor: '',
        use: [],
        options: { legacyMode: true }
      });

      expect(middleware).type.toBe<LegacyApiHandler>();
    }

    {
      const middleware = withMiddleware(
        (req) => {
          expect(req).type.toBe<NextApiRequestLike>();
        },
        {
          descriptor: '',
          use: [],
          options: { legacyMode: true }
        }
      );

      expect(middleware).type.toBe<LegacyApiHandler>();
    }

    {
      const middleware = withMiddleware(
        (req, res) => {
          expect(req).type.toBe<NextApiRequestLike>();
          expect(res).type.toBe<NextApiResponseLike>();
        },
        {
          descriptor: '',
          use: [],
          options: { legacyMode: true }
        }
      );

      expect(middleware).type.toBe<LegacyApiHandler>();
    }

    {
      const middleware = withMiddleware(
        (req, res, ctx) => {
          expect(req).type.toBe<NextApiRequestLike>();
          expect(res).type.toBe<NextApiResponseLike>();
          expect(ctx).type.toBeAssignableTo<Record<PropertyKey, unknown>>();
        },
        {
          descriptor: '',
          use: [],
          options: { legacyMode: true }
        }
      );

      expect(withMiddleware).type.not.toBeCallableWith([
        (
          _req: NextApiRequestLike,
          _res: NextApiResponseLike,
          _ctx: Record<PropertyKey, unknown>
        ) => undefined,
        {
          descriptor: '',
          use: []
          // ? Missing the required "legacyMode: true" option!
          //options: { legacyMode: true }
        }
      ]);

      expect(middleware).type.toBe<LegacyApiHandler>();
    }

    {
      const middleware = withMiddleware(() => undefined, {
        descriptor: '',
        use: []
      });

      expect(middleware).type.toBe<ModernApiHandler>();
    }

    {
      const middleware = withMiddleware(
        (request) => {
          expect(request).type.toBe<Request>();
        },
        {
          descriptor: '',
          use: []
        }
      );

      expect(middleware).type.toBe<ModernApiHandler>();
    }

    {
      const middleware = withMiddleware(
        (request, ctx) => {
          expect(request).type.toBe<Request>();
          expect(ctx).type.toBeAssignableTo<Record<PropertyKey, unknown>>();
        },
        {
          descriptor: '',
          use: []
        }
      );

      expect(middleware).type.toBe<ModernApiHandler>();
    }

    {
      const middleware = withMiddleware(
        (request, ctx) => {
          expect(request).type.toBe<Request>();
          expect(ctx).type.toBeAssignableTo<Record<PropertyKey, unknown>>();
        },
        {
          descriptor: '',
          use: [],
          options: { legacyMode: false }
        }
      );

      expect(middleware).type.toBe<ModernApiHandler>();
    }
  });

  it('supports specifying custom options and heap types', async () => {
    {
      const middleware = withMiddleware<{ extra: boolean }, { thingy: boolean }>(
        (request, ctx) => {
          expect(request).type.toBe<Request>();
          expect(ctx).type.toBe<{ thingy: boolean }>();
        },
        {
          descriptor: '',
          use: [
            (reqOrRequest, ResOrContext, maybeContext) => {
              expect(reqOrRequest).type.toBe<NextApiRequestLike | Request>();

              expect(ResOrContext).type.toBe<
                NextApiResponseLike | ModernMiddlewareContext<any, any>
              >();

              expect(maybeContext).type.toBeAssignableTo<
                | LegacyMiddlewareContext<
                    Record<string, unknown>,
                    Record<PropertyKey, unknown>
                  >
                | undefined
              >();
            }
          ],
          options: { extra: true }
        }
      );

      expect(middleware).type.toBeAssignableTo<ModernApiHandler>();
      expect<ReturnType<typeof middleware>>().type.toBeAssignableWith<
        Promise<Response>
      >();

      expect(
        withMiddleware<{ extra: boolean }, { thingy: boolean }>
      ).type.not.toBeCallableWith([
        () => undefined,
        {
          descriptor: '',
          use: []
          // ? Missing the required "extra" option!
          //options: { extra: true }
        }
      ]);

      expect(
        withMiddleware<{ extra: boolean }, { thingy: boolean }>
      ).type.not.toBeCallableWith([
        () => undefined,
        {
          descriptor: '',
          use: [],
          // ? Missing the required "extra" option!
          options: {
            /* extra: true */
          }
        }
      ]);
    }

    {
      const middleware = withMiddleware<{ extra: boolean }, { thingy: boolean }>(
        (req, res, ctx) => {
          expect(req).type.toBe<NextApiRequestLike>();
          expect(res).type.toBe<NextApiResponseLike>();
          expect(ctx).type.toBe<{ thingy: boolean }>();
        },
        {
          descriptor: '',
          use: [
            (reqOrRequest, ResOrContext, maybeContext) => {
              expect(reqOrRequest).type.toBe<NextApiRequestLike | Request>();

              expect(ResOrContext).type.toBe<
                NextApiResponseLike | ModernMiddlewareContext<any, any>
              >();

              expect(maybeContext).type.toBeAssignableTo<
                | LegacyMiddlewareContext<
                    Record<string, unknown>,
                    Record<PropertyKey, unknown>
                  >
                | undefined
              >();
            }
          ],
          options: { extra: true, legacyMode: true }
        }
      );

      expect(middleware).type.toBeAssignableTo<LegacyApiHandler>();
      expect<ReturnType<typeof middleware>>().type.toBeAssignableWith<
        Promise<Response>
      >();

      expect(
        withMiddleware<{ extra: boolean }, { thingy: boolean }>
      ).type.not.toBeCallableWith([
        (
          _req: NextApiRequestLike,
          _res: NextApiResponseLike,
          _ctx: Record<PropertyKey, unknown>
        ) => undefined,
        {
          descriptor: '',
          use: [],
          // ? Missing the required "legacyMode" option!
          options: { extra: true }
        }
      ]);

      expect(
        withMiddleware<{ extra: boolean }, { thingy: boolean }>
      ).type.not.toBeCallableWith([
        (
          _req: NextApiRequestLike,
          _res: NextApiResponseLike,
          _ctx: Record<PropertyKey, unknown>
        ) => undefined,
        {
          descriptor: '',
          use: [],
          // ? Missing the required "extra" option!
          options: { legacyMode: true }
        }
      ]);
    }
  });

  it('supports invoking other middleware bound by their custom options', async () => {
    type BaselineOptions = AuthMiddlewareOptions & LimitsMiddlewareOptions;
    type Heap = { value: true };

    {
      withMiddleware<
        BaselineOptions &
          ErrorHandlingMiddlewareOptions<ModernErrorHandler<BaselineOptions, Heap>>,
        Heap
      >(
        (request, heap) => {
          expect(request).type.toBe<InstanceType<typeof Request>>();
          expect(heap).type.toBe<Heap>();
        },
        {
          descriptor: '',
          use: [makeAuthMiddleware(), makeLimitsMiddleware()],
          useOnError: [makeErrorHandlingMiddleware()],
          options: {
            requiresAuth: false,
            errorHandlers: new Map([
              [
                TypeError,
                (request, response, error, ctx) => {
                  expect(request).type.toBe<Request>();
                  expect(response).type.toBe<Response>();
                  expect(error).type.toBeAssignableWith<JsonError>();
                  expect(ctx).type.toBe<
                    ModernMiddlewareContext<BaselineOptions, Heap>
                  >();

                  return Response.json(error, { status: 500 });
                }
              ]
            ])
          }
        }
      );

      expect(
        withMiddleware<
          BaselineOptions &
            ErrorHandlingMiddlewareOptions<ModernErrorHandler<BaselineOptions, Heap>>,
          Heap
        >
      ).type.not.toBeCallableWith([
        () => undefined,
        {
          descriptor: '',
          use: [],
          // ? Missing the required "requiresAuth" option!
          options: { errorHandlers: new Map([]) }
        }
      ]);
    }

    {
      withMiddleware<
        ErrorHandlingMiddlewareOptions<LegacyErrorHandler<BaselineOptions, Heap>>,
        Heap
      >(
        (req, res, heap) => {
          expect(req).type.toBe<NextApiRequestLike>();
          expect(res).type.toBe<NextApiResponseLike>();
          expect(heap).type.toBe<Heap>();
        },
        {
          descriptor: '',
          use: [makeAuthMiddleware(), makeLimitsMiddleware()],
          useOnError: [makeErrorHandlingMiddleware()],
          options: {
            legacyMode: true,
            errorHandlers: new Map([
              [
                TypeError,
                (req, res, error, ctx) => {
                  expect(req).type.toBe<NextApiRequestLike>();
                  expect(res).type.toBe<NextApiResponseLike>();
                  expect(error).type.toBeAssignableWith<JsonError>();
                  expect(ctx).type.toBe<
                    LegacyMiddlewareContext<BaselineOptions, Heap>
                  >();

                  res.status(500).send(error);
                }
              ]
            ])
          }
        }
      );

      expect(
        withMiddleware<
          BaselineOptions &
            ErrorHandlingMiddlewareOptions<LegacyErrorHandler<BaselineOptions, Heap>>,
          Heap
        >
      ).type.not.toBeCallableWith([
        (
          _req: NextApiRequestLike,
          _res: NextApiResponseLike,
          _ctx: Record<PropertyKey, unknown>
        ) => undefined,
        {
          descriptor: '',
          use: [],
          // ? Missing the required "legacyMode: true" option!
          options: { errorHandlers: new Map([]) }
        }
      ]);

      expect(
        withMiddleware<
          BaselineOptions &
            ErrorHandlingMiddlewareOptions<LegacyErrorHandler<BaselineOptions, Heap>>,
          Heap
        >
      ).type.not.toBeCallableWith([
        (
          _req: NextApiRequestLike,
          _res: NextApiResponseLike,
          _ctx: Record<PropertyKey, unknown>
        ) => undefined,
        {
          descriptor: '',
          use: [],
          // ? Missing the required "errorHandlers" option!
          options: { legacyMode: true }
        }
      ]);
    }
  });

  it('supports type generics', async () => {
    withMiddleware(undefined, {
      descriptor: '',
      use: [myMiddleware],
      options: { legacyMode: true }
    });

    withMiddleware<MyMiddlewareOptions>(undefined, {
      descriptor: '/fake',
      use: [myMiddleware],
      options: { customOption: false, legacyMode: true }
    });

    expect(withMiddleware<MyMiddlewareOptions>).type.not.toBeCallableWith([
      undefined,
      {
        descriptor: '/fake',
        use: [myMiddleware],
        options: { legacyMode: true }
      }
    ]);

    withMiddleware<MyMiddlewareOptions>(undefined, {
      descriptor: '/fake',
      use: [myMiddleware],
      options: { customOption: true, legacyMode: true }
    });

    withMiddleware<MyMiddlewareOptions>(undefined, {
      descriptor: '/fake',
      use: [myMiddleware],
      options: { customOption: true as boolean, legacyMode: true }
    });

    withMiddleware<MyMiddlewareOptions & { anotherOpt: boolean }>(undefined, {
      descriptor: '/fake',
      use: [
        myMiddleware,
        (_, __, context) => {
          const {
            options: { anotherOpt }
          } = context!;
          void anotherOpt;
        }
      ],
      options: { customOption: true, anotherOpt: true, legacyMode: true }
    });

    withMiddleware<MyMiddlewareOptions & { anotherOpt?: boolean }>(undefined, {
      descriptor: '/fake',
      use: [
        myMiddleware,
        (_, __, context) => {
          const {
            options: { anotherOpt }
          } = context!;
          void anotherOpt;
        }
      ],
      options: { customOption: true, legacyMode: true }
    });

    withMiddleware(undefined, {
      descriptor: '/fake',
      use: [myPartialMiddleware],
      options: { legacyMode: true }
    });

    withMiddleware<Partial<MyMiddlewareOptions>>(undefined, {
      descriptor: '/fake',
      use: [myPartialMiddleware],
      options: { legacyMode: true }
    });
  });
});

describe('::middlewareFactory', () => {
  it('supports type generics', async () => {
    middlewareFactory({
      use: [myMiddleware],
      options: { legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory<MyMiddlewareOptions>({
      use: [myMiddleware],
      options: { legacyMode: true, customOption: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory<MyMiddlewareOptions>({
      use: [myMiddleware],
      options: { customOption: false, legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory<MyMiddlewareOptions & { anotherOpt: boolean }>({
      use: [
        myMiddleware,
        (_, __, context) => {
          const {
            options: { anotherOpt }
          } = context!;
          void anotherOpt;
        }
      ],
      options: { customOption: true, anotherOpt: false, legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory({
      use: [myPartialMiddleware],
      options: { legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory<Partial<MyMiddlewareOptions>>({
      use: [myPartialMiddleware],
      options: { legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory({
      use: [myPartialMiddleware],
      options: { legacyMode: true }
    })(undefined, {
      descriptor: '/fake',
      appendUse: [myMiddleware]
    });

    middlewareFactory({
      use: [myPartialMiddleware],
      options: { legacyMode: true }
    })(undefined, {
      descriptor: '/fake',
      appendUse: [myPartialMiddleware],
      appendUseOnError: [myPartialMiddleware]
    });

    middlewareFactory<MyMiddlewareOptions>({
      use: [myPartialMiddleware],
      options: { legacyMode: true, customOption: false }
    })(undefined, {
      descriptor: '/fake',
      prependUse: [myMiddleware],
      prependUseOnError: [myMiddleware]
    });

    middlewareFactory<MyMiddlewareOptions>({
      use: [myPartialMiddleware],
      options: { legacyMode: true, customOption: false }
    })(undefined, {
      descriptor: '/fake',
      // @ts-expect-error: bad type for required property: customOption
      options: { customOption: 5 }
    });
  });
});
