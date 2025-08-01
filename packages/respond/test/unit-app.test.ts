import { testApiHandler } from 'next-test-api-route-handler';

import {
  sendGenericHttpResponse,
  sendHttpBadContentType,
  sendHttpBadMethod,
  sendHttpBadRequest,
  sendHttpContrivedError,
  sendHttpErrorResponse,
  sendHttpNotFound,
  sendHttpOk,
  sendHttpRateLimited,
  sendHttpSuccessResponse,
  sendHttpTooLarge,
  sendHttpUnauthenticated,
  sendHttpUnauthorized,
  sendHttpUnspecifiedError,
  sendNotImplemented
} from 'universe+respond';

import { ErrorMessage } from 'universe+respond:error.ts';

const customError = 'custom error';

describe('::sendGenericHttpResponse', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendGenericHttpResponse({ status: 201 });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(201);
        await expect(res.json()).resolves.toStrictEqual({});
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendGenericHttpResponse({ status: 201 }, { json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(201);
        await expect(res.json()).resolves.toStrictEqual({ json: 'data' });
      }
    });
  });

  it('sends application/json header', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendGenericHttpResponse({ status: 200 });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(200);
        expect(res.headers.get('content-type')).toStartWith('application/json');
      }
    });
  });
});

describe('::sendHttpErrorResponse', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpErrorResponse(
            { status: 400 },
            {
              json: 'data',
              error: ErrorMessage.SendHttpErrorResponse()
            }
          );
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(400);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          json: 'data',
          error: ErrorMessage.SendHttpErrorResponse()
        });
      }
    });
  });

  it('allows overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpBadMethod({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(405);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: customError
        });
      }
    });
  });
});

describe('::sendHttpSuccessResponse', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpSuccessResponse({ status: 202 });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(202);
        await expect(res.json()).resolves.toStrictEqual({
          success: true
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpSuccessResponse({ status: 202 }, { json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(202);
        await expect(res.json()).resolves.toStrictEqual({
          success: true,
          json: 'data'
        });
      }
    });
  });
});

describe('::sendHttpBadMethod', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpBadMethod();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(405);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpBadMethod()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpBadMethod({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(405);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpBadMethod(),
          json: 'data'
        });
      }
    });
  });

  it('allows overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpBadRequest({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(400);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: customError
        });
      }
    });
  });
});

describe('::sendHttpBadRequest', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpBadRequest();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(400);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpBadRequest()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpBadRequest({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(400);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpBadRequest(),
          json: 'data'
        });
      }
    });
  });

  it('allows overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpContrivedError({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(555);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: customError
        });
      }
    });
  });
});

describe('::sendHttpContrivedError', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpContrivedError();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(555);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpContrivedError()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpContrivedError({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(555);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpContrivedError(),
          json: 'data'
        });
      }
    });
  });

  it('allows overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpUnspecifiedError({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(500);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: customError
        });
      }
    });
  });
});

describe('::sendHttpUnspecifiedError', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpUnspecifiedError();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(500);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpUnspecifiedError()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpUnspecifiedError({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(500);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpUnspecifiedError(),
          json: 'data'
        });
      }
    });
  });

  it('allows overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpErrorResponse({ status: 400 }, { error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(400);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: customError
        });
      }
    });
  });
});

describe('::sendHttpOk', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpOk();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(200);
        await expect(res.json()).resolves.toStrictEqual({
          success: true
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpOk({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(200);
        await expect(res.json()).resolves.toStrictEqual({
          success: true,
          json: 'data'
        });
      }
    });
  });
});

describe('::sendHttpNotFound', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpNotFound();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(404);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpNotFound()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpNotFound({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(404);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpNotFound(),
          json: 'data'
        });
      }
    });
  });

  it('allows overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpNotFound({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(404);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: customError
        });
      }
    });
  });
});

describe('::sendHttpRateLimited', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpRateLimited();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(429);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpRateLimited()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpRateLimited({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(429);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpRateLimited(),
          json: 'data'
        });
      }
    });
  });

  it('allows overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpRateLimited({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(429);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: customError
        });
      }
    });
  });
});

describe('::sendHttpTooLarge', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpTooLarge();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(413);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpTooLarge()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpTooLarge({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(413);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpTooLarge(),
          json: 'data'
        });
      }
    });
  });

  it('allows overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpTooLarge({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(413);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: customError
        });
      }
    });
  });
});

describe('::sendHttpBadContentType', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpBadContentType();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(415);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpBadContentType()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpBadContentType({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(415);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpBadContentType(),
          json: 'data'
        });
      }
    });
  });

  it('allows overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpBadContentType({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(415);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: customError
        });
      }
    });
  });
});

describe('::sendHttpUnauthenticated', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpUnauthenticated();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(401);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpUnauthenticated()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpUnauthenticated({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(401);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpUnauthenticated(),
          json: 'data'
        });
      }
    });
  });

  it('does not allow overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpUnauthenticated({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(401);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpUnauthenticated()
        });
      }
    });
  });
});

describe('::sendHttpUnauthorized', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpUnauthorized();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(403);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpUnauthorized()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpUnauthorized({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(403);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpUnauthorized(),
          json: 'data'
        });
      }
    });
  });

  it('does not allow overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendHttpUnauthorized({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(403);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendHttpUnauthorized()
        });
      }
    });
  });
});

describe('::sendNotImplemented', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendNotImplemented();
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(501);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendNotImplemented()
        });
      }
    });

    await testApiHandler({
      appHandler: {
        GET() {
          return sendNotImplemented({ json: 'data' });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(501);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: ErrorMessage.SendNotImplemented(),
          json: 'data'
        });
      }
    });
  });

  it('allows overriding error property in json response', async () => {
    expect.hasAssertions();

    await testApiHandler({
      appHandler: {
        GET() {
          return sendNotImplemented({ error: customError });
        }
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(501);
        await expect(res.json()).resolves.toStrictEqual({
          success: false,
          error: customError
        });
      }
    });
  });
});
