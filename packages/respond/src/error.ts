/**
 * A collection of possible error and warning messages.
 */
/* istanbul ignore next */
export const ErrorMessage = {
  SendHttpErrorResponse() {
    return 'request failed for an unspecified reason';
  },
  SendHttpBadRequest() {
    return 'request was malformed or otherwise bad';
  },
  SendHttpUnauthenticated() {
    return 'request sender is not authenticated';
  },
  SendHttpUnauthorized() {
    return 'request sender is not authorized to access this resource';
  },
  SendHttpNotFound() {
    return 'requested resource was not found';
  },
  SendHttpBadMethod() {
    return 'request method is not allowed';
  },
  SendHttpTooLarge() {
    return 'request body is too large';
  },
  SendHttpBadContentType() {
    return 'request payload is in an unsupported format';
  },
  SendHttpRateLimited() {
    return 'request sender is rate limited';
  },
  SendHttpUnspecifiedError() {
    return '🤯 something unexpected happened on our end 🤯';
  },
  SendNotImplemented() {
    return 'this endpoint has not yet been implemented';
  },
  SendHttpContrivedError() {
    return '(note: do not report this contrived error)';
  }
};
