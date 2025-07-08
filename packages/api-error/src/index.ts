import { makeNamedError } from '@-xun/error';

export { isANamedErrorClass, isANamedErrorInstance } from '@-xun/error';

const { ApiError } = makeNamedError(class ApiError extends Error {}, 'ApiError');

const { SanityError } = makeNamedError(
  class SanityError extends ApiError {},
  'SanityError'
);

const { ClientValidationError } = makeNamedError(
  class ClientValidationError extends ApiError {},
  'ClientValidationError'
);

const { ServerValidationError } = makeNamedError(
  class ServerValidationError extends ApiError {},
  'ServerValidationError'
);

const { AuthError } = makeNamedError(class AuthError extends ApiError {}, 'AuthError');

const { ForbiddenError } = makeNamedError(
  class ForbiddenError extends ApiError {},
  'ForbiddenError'
);

const { NotFoundError } = makeNamedError(
  class NotFoundError extends ApiError {},
  'NotFoundError'
);

const { NotImplementedError } = makeNamedError(
  class extends ApiError {},
  'NotImplementedError'
);

export type ApiError = InstanceType<typeof ApiError>;
export type AuthError = InstanceType<typeof AuthError>;
export type ClientValidationError = InstanceType<typeof ClientValidationError>;
export type ForbiddenError = InstanceType<typeof ForbiddenError>;
export type NotFoundError = InstanceType<typeof NotFoundError>;
export type NotImplementedError = InstanceType<typeof NotImplementedError>;
export type SanityError = InstanceType<typeof SanityError>;
export type ServerValidationError = InstanceType<typeof ServerValidationError>;

export {
  /**
   * Generic base API-related error (HTTP 500).
   *
   * This class is the ancestor of all error types exported by
   * `@-xun/api-error`.
   */
  ApiError,
  /**
   * An authentication or generic authorization issue (HTTP 401).
   */
  AuthError,
  /**
   * A client-side validation issue (HTTP 400).
   */
  ClientValidationError,
  /**
   * A resource authorization issue (HTTP 403).
   */
  ForbiddenError,
  /**
   * A resource existence issue (HTTP 404).
   */
  NotFoundError,
  /**
   * An issue with unimplemented functionality (HTTP 501).
   */
  NotImplementedError,
  /**
   * An impossible issue (HTTP 500).
   */
  SanityError,
  /**
   * A server-side validation issue (HTTP 500).
   */
  ServerValidationError
};
