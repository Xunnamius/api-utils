/**
 * A collection of possible error and warning messages.
 */
/* istanbul ignore next */
export const ErrorMessage = {
  BadVariables(errors: string[]) {
    return `bad variables:\n - ${errors.join('\n - ')}`;
  },
  UnknownHttpMethod(method: string, validHttpMethods: readonly string[]) {
    return `unknown method "${method}", must be one of: ${validHttpMethods.join(', ')}`;
  },
  BadMongoMsPort() {
    return `optional environment variable MONGODB_MS_PORT must be > 1024`;
  },
  BadValue(name: string, value: unknown, reason: string) {
    return `bad ${name}, saw "${String(value)}" (${reason})`;
  },
  UnexpectedNegativeNumber(name: string, value: unknown) {
    return ErrorMessage.BadValue(name, value, 'expected a non-negative number');
  },
  UnexpectedEmptyOrMissing(name: string, value: unknown) {
    return ErrorMessage.BadValue(name, value, 'missing or unexpected value');
  }
};
