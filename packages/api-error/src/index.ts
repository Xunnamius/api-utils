// TODO: Augment with @-xun/error

export class ApiError extends Error {}
export class SanityError extends ApiError {}
export class ClientValidationError extends ApiError {}
export class ServerValidationError extends ApiError {}
export class AuthError extends ApiError {}
export class ForbiddenError extends ApiError {}
export class NotFoundError extends ApiError {}
export class NotImplementedError extends ApiError {}
