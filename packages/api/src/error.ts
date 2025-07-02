/**
 * A collection of possible error and warning messages.
 */
/* istanbul ignore next */
export const ErrorMessage = {
  SanityCheckFailed() {
    return 'sanity check failed: please report exactly what you did just now!';
  },
  RuntimeNextCalledUnexpectedly() {
    return 'runtime.next was called unexpectedly';
  },
  RuntimeDoneCalledUnexpectedly() {
    return 'runtime.done was called unexpectedly';
  },
  InvalidOptionInMiddlewareConfig(option: string) {
    return `a valid "${option}" option is missing from middleware configuration`;
  },
  InvalidAllowedContentTypes() {
    return 'allowedContentTypes must adhere to type constraints';
  },
  MustDisableBodyParser() {
    return "Next.js's body parser must be disabled when using add-raw-body middleware";
  },
  UnexpectedPropertyCollision() {
    return 'NextApiRequest object already has a defined "rawBody" property (is the add-raw-body middleware obsolete?)';
  },
  MissingRawBodyProperty() {
    return 'encountered a NextApiRequestLike object without a rawBody property';
  },
  MethodIsUndefined() {
    return 'undefined method';
  },
  BadContentType(contentType: string | null | undefined, method: string | undefined) {
    return `unrecognized or disallowed Content-Type header for method "${String(method)}": ${
      contentType ? `"${contentType}"` : '(none)'
    }`;
  },
  CannotHandleContentType() {
    return 'the server is not configured to handle this type of request';
  },
  AllClientsLockedOut() {
    return 'the server has temporarily locked out all clients';
  }
};
