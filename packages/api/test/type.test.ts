// * These tests ensure the exported types under test function as expected.

import { describe, expect, it } from 'tstyche';

import { middlewareFactory, withMiddleware } from 'universe+api';
import authRequest from 'universe+api:middleware/auth-request.ts';
import handleError from 'universe+api:middleware/handle-error.ts';
import limitRequest from 'universe+api:middleware/limit-request.ts';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextRequest, NextResponse } from 'next/server';
import type { LegacyApiHandler, ModernApiHandler } from 'universe+api';
import type { Options as AuthRequestOptions } from 'universe+api:middleware/auth-request.ts';
import type { Options as HandleErrorOptions } from 'universe+api:middleware/handle-error.ts';
import type { Options as LimitRequestOptions } from 'universe+api:middleware/limit-request.ts';
import type { MiddlewareContext } from 'universe+api:types.ts';
import type { JsonError } from 'universe+respond';

import type {
  NextApiRequestLike,
  NextApiResponseLike
} from 'universe+shared:next-like.ts';

type GenericLegacyApiHandler = LegacyApiHandler<
  NextApiRequestLike,
  NextApiResponseLike,
  Record<PropertyKey, unknown>
>;

type GenericModernApiHandler = ModernApiHandler<
  Request,
  Response,
  Record<PropertyKey, unknown>
>;

describe('::withMiddleware', () => {
  it('supports legacy and modern middleware call signatures', async () => {
    {
      const middleware = withMiddleware(() => undefined, {
        descriptor: '',
        use: [],
        options: { legacyMode: true }
      });

      expect(middleware).type.toBe<GenericLegacyApiHandler>();
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

      expect(middleware).type.toBe<GenericLegacyApiHandler>();
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

      expect(middleware).type.toBe<GenericLegacyApiHandler>();
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

      expect(middleware).type.toBe<GenericLegacyApiHandler>();
    }

    {
      const middleware = withMiddleware(
        (request, ctx) => {
          expect(request).type.toBe<NextApiRequestLike>();
          expect(ctx).type.toBeAssignableTo<Record<PropertyKey, unknown>>();
        },
        {
          descriptor: '',
          use: [],
          options: { legacyMode: false }
        }
      );

      expect(middleware).type.toBe<GenericModernApiHandler>();
    }

    {
      const middleware = withMiddleware(() => undefined, {
        descriptor: '',
        use: []
      });

      expect(middleware).type.toBe<GenericModernApiHandler>();
    }

    {
      const middleware = withMiddleware(
        (request) => {
          expect(request).type.toBe<NextApiRequestLike>();
        },
        {
          descriptor: '',
          use: []
        }
      );

      expect(middleware).type.toBe<GenericModernApiHandler>();
    }

    {
      const middleware = withMiddleware(
        (request, ctx) => {
          expect(request).type.toBe<NextApiRequestLike>();
          expect(ctx).type.toBeAssignableTo<Record<PropertyKey, unknown>>();
        },
        {
          descriptor: '',
          use: []
        }
      );

      expect(middleware).type.toBe<GenericModernApiHandler>();
    }
  });

  it('supports specifying custom request, response, and heap types', async () => {
    {
      const middleware = withMiddleware<
        { extra: boolean },
        NextRequest,
        NextResponse,
        { thingy: boolean }
      >(
        (request, ctx) => {
          expect(request).type.toBe<NextRequest>();
          expect(ctx).type.toBe<{ thingy: boolean }>();
        },
        {
          descriptor: '',
          use: [
            (request, ctx) => {
              expect(request).type.toBe<NextRequest>();
              expect(ctx).type.toBeAssignableTo<
                MiddlewareContext<{ extra: boolean }, { thingy: boolean }>
              >();
            }
          ]
        }
      );

      expect<ReturnType<typeof middleware>>().type.toBeAssignableWith<NextResponse>();
      expect(middleware).type.toBeAssignableTo<GenericModernApiHandler>();
    }

    {
      const middleware = withMiddleware<
        { extra: boolean },
        NextApiRequest,
        NextApiResponse,
        { thingy: boolean }
      >(
        (req, res, ctx) => {
          expect(req).type.toBe<NextApiRequest>();
          expect(res).type.toBe<NextApiResponse>();
          expect(ctx).type.toBe<{ thingy: boolean }>();
        },
        {
          descriptor: '',
          use: [
            (req, res, ctx) => {
              expect(req).type.toBe<NextApiRequest>();
              expect(res).type.toBe<NextApiResponse>();
              expect(ctx).type.toBeAssignableTo<
                MiddlewareContext<{ extra: boolean }, { thingy: boolean }>
              >();
            }
          ],
          options: { legacyMode: true }
        }
      );

      expect(middleware).type.toBeAssignableTo<GenericLegacyApiHandler>();
    }
  });

  it('supports invoking other middleware bound by their custom options', async () => {
    {
      withMiddleware<
        AuthRequestOptions & LimitRequestOptions & HandleErrorOptions,
        NextRequest,
        NextResponse
      >(
        (request) => {
          expect(request).type.toBe<NextRequest>();
        },
        {
          descriptor: '',
          use: [authRequest, limitRequest],
          useOnError: [handleError],
          options: {
            errorHandlers: new Map([
              [
                TypeError,
                (error, ctx) => {
                  expect(error).type.toBeAssignableTo<JsonError>();
                  expect(ctx).type.toBeAssignableTo<Record<PropertyKey, unknown>>();
                  return Response.json(error, { status: 500 });
                }
              ]
            ])
          }
        }
      );
    }

    {
      withMiddleware<
        AuthRequestOptions & LimitRequestOptions & HandleErrorOptions,
        NextApiRequest,
        NextApiResponse
      >(
        (req, res) => {
          expect(req).type.toBe<NextApiRequest>();
          expect(res).type.toBe<NextApiResponse>();
        },
        {
          descriptor: '',
          use: [authRequest, limitRequest],
          useOnError: [handleError],
          options: {
            legacyMode: true,
            errorHandlers: new Map([
              [
                TypeError,
                (req, res, error, ctx) => {
                  expect(req).type.toBe<NextApiRequest>();
                  expect(res).type.toBe<NextApiResponse>();
                  expect(error).type.toBeAssignableTo<JsonError>();
                  expect(ctx).type.toBeAssignableTo<Record<PropertyKey, unknown>>();
                  return res.status(500).send(error);
                }
              ]
            ])
          }
        }
      );
    }
  });

  it('supports type generics', async () => {
    type MyMiddlewareOptions = { customOption: boolean };

    const myMiddleware = (
      _: NextApiRequestLike,
      res: NextApiResponseLike,
      {
        options: { customOption }
      }: MiddlewareContext<MyMiddlewareOptions, Record<string, unknown>>
    ) => {
      res.status(200).send(customOption);
    };

    const myPartialMiddleware = (
      _: NextApiRequestLike,
      res: NextApiResponseLike,
      {
        options: { customOption }
      }: MiddlewareContext<Partial<MyMiddlewareOptions>, Record<string, unknown>>
    ) => {
      res.status(200).send(customOption);
    };

    withMiddleware(undefined, {
      descriptor: '',
      use: [myMiddleware],
      options: { legacyMode: true }
    });

    withMiddleware<MyMiddlewareOptions>(undefined, {
      descriptor: '/fake',
      use: [myMiddleware],
      options: { legacyMode: true }
    });

    withMiddleware<MyMiddlewareOptions>(undefined, {
      descriptor: '/fake',
      use: [myMiddleware],
      options: { legacyMode: true }
    });

    withMiddleware<MyMiddlewareOptions>(undefined, {
      descriptor: '/fake',
      use: [myMiddleware],
      options: { customOption: true, legacyMode: true }
    });

    withMiddleware<MyMiddlewareOptions & { anotherOpt: boolean }>(undefined, {
      descriptor: '/fake',
      use: [
        myMiddleware,
        (_, __, { options: { anotherOpt } }) => {
          expect(anotherOpt).type.toBe<boolean>();
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
    type myMiddlewareRequiredOptions = { customOption: boolean };

    const myMiddleware = (
      _: NextApiRequestLike,
      res: NextApiResponseLike,
      {
        options: { customOption }
      }: MiddlewareContext<myMiddlewareRequiredOptions, Record<string, unknown>>
    ) => {
      res.status(200).send(customOption);
    };

    const myPartialMiddleware = (
      _: NextApiRequestLike,
      res: NextApiResponseLike,
      {
        options: { customOption }
      }: MiddlewareContext<Partial<myMiddlewareRequiredOptions>, Record<string, unknown>>
    ) => {
      res.status(200).send(customOption);
    };

    middlewareFactory({
      use: [myMiddleware],
      options: { legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory<myMiddlewareRequiredOptions>({
      use: [myMiddleware],
      options: { legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory<myMiddlewareRequiredOptions>({
      use: [myMiddleware],
      options: { customOption: false, legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory<myMiddlewareRequiredOptions & { anotherOpt: boolean }>({
      use: [
        myMiddleware,
        (_, __, { options: { anotherOpt } }) => {
          void anotherOpt;
        }
      ],
      options: { customOption: true, legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory({
      use: [myPartialMiddleware],
      options: { legacyMode: true }
    })(undefined, {
      descriptor: '/fake'
    });

    middlewareFactory<Partial<myMiddlewareRequiredOptions>>({
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

    middlewareFactory<myMiddlewareRequiredOptions>({
      use: [myPartialMiddleware],
      options: { legacyMode: true }
    })(undefined, {
      descriptor: '/fake',
      prependUse: [myMiddleware],
      prependUseOnError: [myMiddleware]
    });

    middlewareFactory<myMiddlewareRequiredOptions>({
      use: [myPartialMiddleware],
      options: { legacyMode: true }
    })(undefined, {
      descriptor: '/fake',
      // @ts-expect-error: bad type for required property: customOption
      options: { customOption: 5 }
    });
  });
});
