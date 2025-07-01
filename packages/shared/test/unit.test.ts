import { testApiHandler } from 'next-test-api-route-handler';

import {
  getAuthorizationHeaderFromRequestLike,
  isNextApiRequestLike,
  isNextApiResponseLike
} from 'universe+shared:next-like.ts';

describe('::isNextApiRequestLike, ::isNextApiResponseLike', () => {
  it('returns true only if object is similar enough to NextApiRequest', async () => {
    expect.hasAssertions();

    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler(req, res) {
        expect(isNextApiRequestLike(req)).toBeTrue();
        expect(isNextApiResponseLike(res)).toBeTrue();
        res.status(200).send('OK');
      },
      test: async ({ fetch }) => void (await fetch())
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      appHandler: {
        async GET(request) {
          const { NextResponse } = require('next/server');

          expect(isNextApiRequestLike(request)).toBeFalse();
          expect(isNextApiResponseLike(new NextResponse('OK'))).toBeFalse();
          expect(isNextApiRequestLike(new Request('https://example.com'))).toBeFalse();
          expect(isNextApiResponseLike(new Response('OK'))).toBeFalse();

          return new NextResponse('OK');
        }
      },
      test: async ({ fetch }) => void (await fetch())
    });
  });
});

describe('::getAuthorizationHeaderFromRequestLike', () => {
  it('transforms input into authorization header', async () => {
    expect.hasAssertions();

    const header = 'bearer something-or-other';

    expect(getAuthorizationHeaderFromRequestLike(header)).toBe(header);

    await testApiHandler({
      rejectOnHandlerError: true,
      requestPatcher(req) {
        req.headers.authorization = header;
      },
      pagesHandler(req, res) {
        expect(getAuthorizationHeaderFromRequestLike(req)).toBe(header);
        res.status(200).send('OK');
      },
      test: async ({ fetch }) => void (await fetch())
    });

    await testApiHandler({
      rejectOnHandlerError: true,
      requestPatcher(request) {
        request.headers.set('authorization', header);
      },
      appHandler: {
        async GET(request) {
          const { NextResponse } = require('next/server');

          const nextRequest = new NextResponse(request);
          nextRequest.headers.set('authorization', header);

          expect(getAuthorizationHeaderFromRequestLike(request)).toBe(header);
          expect(getAuthorizationHeaderFromRequestLike(nextRequest)).toBe(header);

          return new NextResponse('OK');
        }
      },
      test: async ({ fetch }) => void (await fetch())
    });
  });
});
