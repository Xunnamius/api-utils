import { makeNamedError } from '@-xun/error';

export { isANamedErrorClass, isANamedErrorInstance } from '@-xun/error';

export const { ApiError } = makeNamedError(class ApiError extends Error {}, 'ApiError');

export const { SanityError } = makeNamedError(
  class SanityError extends ApiError {},
  'SanityError'
);

export const { ClientValidationError } = makeNamedError(
  class ClientValidationError extends ApiError {},
  'ClientValidationError'
);

export const { ServerValidationError } = makeNamedError(
  class ServerValidationError extends ApiError {},
  'ServerValidationError'
);

export const { AuthError } = makeNamedError(
  class AuthError extends ApiError {},
  'AuthError'
);

export const { ForbiddenError } = makeNamedError(
  class ForbiddenError extends ApiError {},
  'ForbiddenError'
);

export const { NotFoundError } = makeNamedError(
  class NotFoundError extends ApiError {},
  'NotFoundError'
);

export const { NotImplementedError } = makeNamedError(
  class extends ApiError {},
  'NotImplementedError'
);

/**
 * Generic base API-related error (HTTP 500).
 *
 * This class is the ancestor of all error types exported by
 * `@-xun/api-error`.
 */
export type ApiError = InstanceType<typeof ApiError>;

/**
 * An authentication or generic authorization issue (HTTP 401).
 */
export type AuthError = InstanceType<typeof AuthError>;

/**
 * A client-side validation issue (HTTP 400).
 */
export type ClientValidationError = InstanceType<typeof ClientValidationError>;

/**
 * A resource authorization issue (HTTP 403).
 */
export type ForbiddenError = InstanceType<typeof ForbiddenError>;

/**
 * A resource existence issue (HTTP 404).
 */
export type NotFoundError = InstanceType<typeof NotFoundError>;

/**
 * An issue with unimplemented functionality (HTTP 501).
 */
export type NotImplementedError = InstanceType<typeof NotImplementedError>;

/**
 * An impossible issue (HTTP 500).
 */
export type SanityError = InstanceType<typeof SanityError>;

/**
 * A server-side validation issue (HTTP 500).
 */
export type ServerValidationError = InstanceType<typeof ServerValidationError>;
