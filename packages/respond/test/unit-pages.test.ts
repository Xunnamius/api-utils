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
      pagesHandler: (_, res) => {
        sendGenericHttpResponse(res, 201);
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(201);
        await expect(res.json()).resolves.toStrictEqual({});
      }
    });

    await testApiHandler({
      pagesHandler: (_, res) => {
        sendGenericHttpResponse(res, 201, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendGenericHttpResponse(res, 200);
      },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.status).toBe(200);
        expect(res.headers.get('content-type')).toStartWith('application/json');
      }
    });
  });
});

describe('::sendHttpBadMethod', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: (_, res) => {
        sendHttpBadMethod(res);
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
      pagesHandler: (_, res) => {
        sendHttpBadMethod(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendHttpBadMethod(res, { error: customError });
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

describe('::sendHttpBadRequest', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: (_, res) => {
        sendHttpBadRequest(res);
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
      pagesHandler: (_, res) => {
        sendHttpBadRequest(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendHttpBadRequest(res, { error: customError });
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

describe('::sendHttpContrivedError', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: (_, res) => {
        sendHttpContrivedError(res);
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
      pagesHandler: (_, res) => {
        sendHttpContrivedError(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendHttpContrivedError(res, { error: customError });
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

describe('::sendHttpUnspecifiedError', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: (_, res) => {
        sendHttpUnspecifiedError(res);
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
      pagesHandler: (_, res) => {
        sendHttpUnspecifiedError(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendHttpUnspecifiedError(res, { error: customError });
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

describe('::sendHttpOk', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: (_, res) => {
        sendHttpOk(res);
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
      pagesHandler: (_, res) => {
        sendHttpOk(res, { json: 'data' });
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

describe('::sendHttpErrorResponse', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: (_, res) => {
        sendHttpErrorResponse(res, 400, {
          json: 'data',
          error: ErrorMessage.SendHttpErrorResponse()
        });
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
      pagesHandler: (_, res) => {
        sendHttpErrorResponse(res, 400, { error: customError });
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

describe('::sendHttpNotFound', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: (_, res) => {
        sendHttpNotFound(res);
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
      pagesHandler: (_, res) => {
        sendHttpNotFound(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendHttpNotFound(res, { error: customError });
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
      pagesHandler: (_, res) => {
        sendHttpRateLimited(res);
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
      pagesHandler: (_, res) => {
        sendHttpRateLimited(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendHttpRateLimited(res, { error: customError });
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

describe('::sendHttpSuccessResponse', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: (_, res) => {
        sendHttpSuccessResponse(res, 202);
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
      pagesHandler: (_, res) => {
        sendHttpSuccessResponse(res, 202, { json: 'data' });
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

describe('::sendHttpTooLarge', () => {
  it('sends appropriate response given arguments', async () => {
    expect.hasAssertions();

    await testApiHandler({
      pagesHandler: (_, res) => {
        sendHttpTooLarge(res);
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
      pagesHandler: (_, res) => {
        sendHttpTooLarge(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendHttpTooLarge(res, { error: customError });
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
      pagesHandler: (_, res) => {
        sendHttpBadContentType(res);
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
      pagesHandler: (_, res) => {
        sendHttpBadContentType(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendHttpBadContentType(res, { error: customError });
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
      pagesHandler: (_, res) => {
        sendHttpUnauthenticated(res);
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
      pagesHandler: (_, res) => {
        sendHttpUnauthenticated(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendHttpUnauthenticated(res, { error: customError });
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
      pagesHandler: (_, res) => {
        sendHttpUnauthorized(res);
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
      pagesHandler: (_, res) => {
        sendHttpUnauthorized(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendHttpUnauthorized(res, { error: customError });
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
      pagesHandler: (_, res) => {
        sendNotImplemented(res);
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
      pagesHandler: (_, res) => {
        sendNotImplemented(res, { json: 'data' });
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
      pagesHandler: (_, res) => {
        sendNotImplemented(res, { error: customError });
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
