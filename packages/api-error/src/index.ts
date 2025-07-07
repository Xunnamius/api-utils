import { makeNamedError } from '@-xun/error';

const { ApiError, isApiError } = makeNamedError(class extends Error {}, 'ApiError');

const { SanityError, isSanityError } = makeNamedError(
  class extends ApiError {},
  'SanityError'
);

const { ClientValidationError, isClientValidationError } = makeNamedError(
  class extends ApiError {},
  'ClientValidationError'
);

const { ServerValidationError, isServerValidationError } = makeNamedError(
  class extends ApiError {},
  'ServerValidationError'
);

const { AuthError, isAuthError } = makeNamedError(
  class extends ApiError {},
  'AuthError'
);

const { ForbiddenError, isForbiddenError } = makeNamedError(
  class extends ApiError {},
  'ForbiddenError'
);

const { NotFoundError, isNotFoundError } = makeNamedError(
  class extends ApiError {},
  'NotFoundError'
);

const { NotImplementedError, isNotImplementedError } = makeNamedError(
  class extends ApiError {},
  'NotImplementedError'
);

export {
  /**
   * Generic base API-related error (HTTP 500).
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
   * @see @{link ApiError}
   */
  isApiError,
  /**
   * @see @{link AuthError}
   */
  isAuthError,
  /**
   * @see @{link ClientValidationError}
   */
  isClientValidationError,
  /**
   * @see @{link ForbiddenError}
   */
  isForbiddenError,
  /**
   * @see @{link NotFoundError}
   */
  isNotFoundError,
  /**
   * @see @{link NotImplementedError}
   */
  isNotImplementedError,
  /**
   * @see @{link SanityError}
   */
  isSanityError,
  /**
   * @see @{link ServerValidationError}
   */
  isServerValidationError,
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
