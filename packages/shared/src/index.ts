import { ErrorMessage, ValidationError } from 'universe/error';
import type { JsonValue } from 'type-fest';

// TODO: should this be deleted?

export function validateAndParseJson<T extends JsonValue>(
  input: string | null | undefined,
  property?: string
): T {
  try {
    return JSON.parse(input || '');
  } catch {
    throw new ValidationError(ErrorMessage.InvalidJSON(property));
  }
}
