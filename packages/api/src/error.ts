/**
 * A collection of possible error and warning messages.
 */
/* istanbul ignore next */
export const ErrorMessage = {
  InvalidSecret(secretType?: string) {
    return `invalid ${secretType ?? 'secret'}`;
  },
  InvalidItem(item: unknown) {
    return `invalid ${String(item)}`;
  },
  SchemeNotImplemented(scheme: string) {
    return `auth string handler for scheme "${scheme}" is not implemented`;
  }
};
