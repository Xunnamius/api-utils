/**
 * A collection of possible error and warning messages.
 */
/* istanbul ignore next */
export const ErrorMessage = {
  GuruMeditation: () => 'an impossible scenario occurred',
  AuthAttemptFailed() {
    return 'auth attempt failed: access forbidden';
  },
  TokenCollision() {
    return 'token collision';
  },
  AliasedDatabaseNotAliasable(
    actual: string,
    alias: string,
    actualDatabaseNames: string[]
  ) {
    return `aliased database "${actual}" (referred to by alias "${alias}") does not exist in database schema or is not aliasable. Existing aliasable databases: ${actualDatabaseNames.join(
      ', '
    )}`;
  },
  InvalidDatabaseAlias(actual: string, alias: string) {
    return `database alias "${alias}" (referring to actual database "${actual}") is invalid: an actual database with that name already exists in the database schema. You must choose a different alias`;
  },
  InvalidEmptyIp() {
    return 'ip must be a non-empty string';
  },
  InvalidEmptyHeader() {
    return 'header must be a non-empty string';
  },
  NeedsEitherIpOrHeader() {
    return 'must provide either an ip or a header';
  }
};

// TODO: replace/augment with @-xun/error

export class ApiError extends Error {}
export class SanityError extends ApiError {}
export class ClientValidationError extends ApiError {}
export class ServerValidationError extends ApiError {}
export class AuthError extends ApiError {}
export class ForbiddenError extends ApiError {}
export class NotFoundError extends ApiError {}
export class NotImplementedError extends ApiError {}
