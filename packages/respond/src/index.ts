/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { isNextApiResponseLike } from 'multiverse+shared';

import { ErrorMessage } from 'universe+respond:error.ts';

import type { HttpStatusCode } from '@-xun/types';
import type { JsonObject } from 'type-fest';
import type { NextApiResponseLike } from 'multiverse+shared';

type ModernGenericParameters = [responseInit: ResponseInit, json?: JsonObject];

type ModernSpecificParameters =
  | [json?: JsonObject]
  | [json: JsonObject, responseInit: ResponseInit];

type LegacyGenericParameters = [
  res: NextApiResponseLike,
  statusCode: HttpStatusCode,
  json?: JsonObject
];

type LegacySpecificParameters = [
  res: LegacyGenericParameters[0],
  json?: LegacyGenericParameters[2]
];

/**
 * Generic success JSON result object. May contain any number of additional
 * jsonifiable key-value pairs.
 */
export interface JsonSuccess extends JsonObject {
  success: true;
}

/**
 * Generic failure JSON result object. May contain any number of additional
 * jsonifiable key-value pairs.
 */
export interface JsonError extends JsonObject {
  error: string;
  success: false;
}

/**
 * Sends a generic HTTP response with the given `statusCode` and optional JSON
 * body (defaults to `{}`). This is the "base" function called by all other
 * response functions.
 */
export function sendGenericHttpResponse(...args: ModernGenericParameters): Response;
export function sendGenericHttpResponse(...args: LegacyGenericParameters): void;
export function sendGenericHttpResponse(
  ...args: ModernGenericParameters | LegacyGenericParameters
): Response | void;
export function sendGenericHttpResponse(
  ...args: ModernGenericParameters | LegacyGenericParameters
) {
  if (isNextApiResponseLike(args[0])) {
    const res = args[0];
    const statusCode = args[1] as HttpStatusCode;
    const json = args[2];

    res
      .setHeader('content-type', 'application/json')
      .status(statusCode)
      .send(json || {});
  } else {
    const responseInit = args[0];
    const json = args[1];

    return Response.json(json || {}, responseInit);
  }
}

/**
 * Sends a generic "success" response and JSON body, optionally with additional
 * properties.
 *
 * This function generates 2xx responses.
 */
export function sendHttpSuccessResponse(...args: ModernGenericParameters): Response;
export function sendHttpSuccessResponse(...args: LegacyGenericParameters): void;
export function sendHttpSuccessResponse(
  ...args: ModernGenericParameters | LegacyGenericParameters
): Response | void;
export function sendHttpSuccessResponse(
  ...args: ModernGenericParameters | LegacyGenericParameters
) {
  if (isNextApiResponseLike(args[0])) {
    const [res, status, incomingJson] = args as LegacyGenericParameters;

    sendGenericHttpResponse(res, status, {
      success: true,
      ...incomingJson
    } satisfies JsonSuccess);
  } else {
    const [responseInit, incomingJson] = args as ModernGenericParameters;

    return sendGenericHttpResponse(responseInit, {
      success: true,
      ...incomingJson
    } satisfies JsonSuccess);
  }
}

/**
 * Sends a generic error response and JSON body, optionally with additional
 * properties.
 *
 * This function generates 4xx and 5xx responses.
 */
export function sendHttpErrorResponse(...args: ModernGenericParameters): Response;
export function sendHttpErrorResponse(...args: LegacyGenericParameters): void;
export function sendHttpErrorResponse(
  ...args: ModernGenericParameters | LegacyGenericParameters
): Response | void;
export function sendHttpErrorResponse(
  ...args: ModernGenericParameters | LegacyGenericParameters
) {
  if (isNextApiResponseLike(args[0])) {
    const [res, status, incomingJson] = args as LegacyGenericParameters;

    sendGenericHttpResponse(res, status, {
      success: false,
      error: ErrorMessage.SendHttpErrorResponse(),
      ...incomingJson
    } satisfies JsonError);
  } else {
    const [responseInit, incomingJson] = args as ModernGenericParameters;

    return sendGenericHttpResponse(responseInit, {
      success: false,
      error: ErrorMessage.SendHttpErrorResponse(),
      ...incomingJson
    } satisfies JsonError);
  }
}

/**
 * Sends an HTTP 200 "ok" response with optional JSON data.
 */
export function sendHttpOk(...args: ModernSpecificParameters): Response;
export function sendHttpOk(...args: LegacySpecificParameters): void;
export function sendHttpOk(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpOk(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpSuccessResponse(res, 200, json);
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpSuccessResponse({ status: 200, ...responseInit }, json);
  }
}

/**
 * Sends an HTTP 400 "client error" response with optional JSON data.
 */
export function sendHttpBadRequest(...args: ModernSpecificParameters): Response;
export function sendHttpBadRequest(...args: LegacySpecificParameters): void;
export function sendHttpBadRequest(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpBadRequest(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendHttpBadRequest();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 400, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 400, ...responseInit }, { ...json, error });
  }
}

/**
 * Sends an HTTP 401 "unauthenticated" response with optional JSON data.
 */
export function sendHttpUnauthenticated(...args: ModernSpecificParameters): Response;
export function sendHttpUnauthenticated(...args: LegacySpecificParameters): void;
export function sendHttpUnauthenticated(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpUnauthenticated(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendHttpUnauthenticated();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 401, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 401, ...responseInit }, { ...json, error });
  }
}

/**
 * Sends an HTTP 403 "forbidden" ("unauthorized") response with optional JSON
 * data.
 */
export function sendHttpUnauthorized(...args: ModernSpecificParameters): Response;
export function sendHttpUnauthorized(...args: LegacySpecificParameters): void;
export function sendHttpUnauthorized(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpUnauthorized(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendHttpUnauthorized();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 403, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 403, ...responseInit }, { ...json, error });
  }
}

/**
 * Sends an HTTP 404 "not found" response with optional JSON data.
 */
export function sendHttpNotFound(...args: ModernSpecificParameters): Response;
export function sendHttpNotFound(...args: LegacySpecificParameters): void;
export function sendHttpNotFound(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpNotFound(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendHttpNotFound();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 404, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 404, ...responseInit }, { ...json, error });
  }
}

/**
 * Sends an HTTP 405 "bad method" response with optional JSON data.
 */
export function sendHttpBadMethod(...args: ModernSpecificParameters): Response;
export function sendHttpBadMethod(...args: LegacySpecificParameters): void;
export function sendHttpBadMethod(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpBadMethod(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendHttpBadMethod();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 405, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 405, ...responseInit }, { ...json, error });
  }
}

/**
 * Sends an HTTP 413 "too big" response with optional JSON data.
 */
export function sendHttpTooLarge(...args: ModernSpecificParameters): Response;
export function sendHttpTooLarge(...args: LegacySpecificParameters): void;
export function sendHttpTooLarge(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpTooLarge(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendHttpTooLarge();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 413, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 413, ...responseInit }, { ...json, error });
  }
}

/**
 * Sends an HTTP 415 "unsupported media type" response with optional JSON data.
 */
export function sendHttpBadContentType(...args: ModernSpecificParameters): Response;
export function sendHttpBadContentType(...args: LegacySpecificParameters): void;
export function sendHttpBadContentType(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpBadContentType(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendHttpBadContentType();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 415, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 415, ...responseInit }, { ...json, error });
  }
}

/**
 * Sends an HTTP 429 "too many requests" response with optional JSON data.
 */
export function sendHttpRateLimited(...args: ModernSpecificParameters): Response;
export function sendHttpRateLimited(...args: LegacySpecificParameters): void;
export function sendHttpRateLimited(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpRateLimited(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendHttpRateLimited();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 429, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 429, ...responseInit }, { ...json, error });
  }
}

/**
 * Sends an unspecified HTTP 500 "error" response with optional JSON data.
 */
export function sendHttpUnspecifiedError(...args: ModernSpecificParameters): Response;
export function sendHttpUnspecifiedError(...args: LegacySpecificParameters): void;
export function sendHttpUnspecifiedError(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpUnspecifiedError(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendHttpUnspecifiedError();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 500, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 500, ...responseInit }, { ...json, error });
  }
}

/**
 * Sends an HTTP 501 "not implemented" response with optional JSON data.
 */
export function sendNotImplemented(...args: ModernSpecificParameters): Response;
export function sendNotImplemented(...args: LegacySpecificParameters): void;
export function sendNotImplemented(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendNotImplemented(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendNotImplemented();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 501, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 501, ...responseInit }, { ...json, error });
  }
}

/**
 * Sends an HTTP 555 "contrived" response with optional JSON data.
 */
export function sendHttpContrivedError(...args: ModernSpecificParameters): Response;
export function sendHttpContrivedError(...args: LegacySpecificParameters): void;
export function sendHttpContrivedError(
  ...args: ModernSpecificParameters | LegacySpecificParameters
): Response | void;
export function sendHttpContrivedError(
  ...args: ModernSpecificParameters | LegacySpecificParameters
) {
  const arg0 = args[0];
  const error = ErrorMessage.SendHttpContrivedError();

  if (isNextApiResponseLike(arg0)) {
    const [res, json] = args as LegacySpecificParameters;
    sendHttpErrorResponse(res, 555, { ...json, error });
  } else {
    const [json, responseInit] = args as ModernSpecificParameters;
    return sendHttpErrorResponse({ status: 555, ...responseInit }, { ...json, error });
  }
}
