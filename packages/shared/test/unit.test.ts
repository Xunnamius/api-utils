import { testApiHandler } from 'next-test-api-route-handler';

import {
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
