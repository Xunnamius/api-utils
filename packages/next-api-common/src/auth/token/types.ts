import type { JsonObject, JsonValue } from 'type-fest';
import type { AuthenticationScheme } from 'universe+next-api-common:auth/constants.ts';

/**
 * The shape of the actual token and scheme data contained within an entry in
 * the well-known "auth" collection.
 */
export type Token = {
  /**
   * The authentication scheme this token supports.
   */
  scheme: AuthenticationScheme;
  /**
   * The actual token.
   */
  token: JsonObject;
};

/**
 * The potential token/scheme of one or more entries in the well-known "auth"
 * collection.
 */
export type TokenFilter = Partial<{
  /**
   * The authentication scheme of the target token(s).
   */
  scheme: string;
  /**
   * The target token(s).
   */
  token: Record<string, JsonValue>;
}>;

/**
 * An array of allowed "auth" full token entry attributes. Each array element
 * must correspond to a field in the {@link TokenAttributes} type and
 * vice-versa.
 */
export const validTokenAttributes = ['owner', 'isGlobalAdmin'] as const;

/**
 * A supported "auth" full token entry attribute (i.e. a field/property name as
 * a string) associated with a specific token and scheme.
 */
export type TokenAttribute = (typeof validTokenAttributes)[number];
/**
 * The shape of the attributes corresponding to a full token entry in the
 * well-known "auth" collection. Each property must correspond to an array
 * element in the {@link validTokenAttributes} array and vice-versa.
 */
// ! `owner` must be the only required property. All others must be optional.
export type TokenAttributes = {
  /**
   * A string (or stringified `ObjectId`) representing the owner of the token.
   */
  owner: string;
  /**
   * If `true`, the token grants access to potentially dangerous abilities via
   * the well-known "/sys" API endpoint.
   *
   * @default undefined
   */
  isGlobalAdmin?: boolean;
};

/**
 * The shape of a filter used to search through the well-known "auth"
 * collection.
 */
export type TokenAttributesFilter = Partial<{
  /**
   * As a string, this represents the target _owner_ of the target token. As an
   * array, this represents the target _owners_ of the target tokens, any of
   * which could be returned.
   */
  owner: string | string[];
  /**
   * The target global administrator status of the target token(s).
   */
  isGlobalAdmin: boolean;
}>;

/**
 * The shape of a bearer token object.
 */
export type BearerToken = {
  /**
   * The authentication scheme this token supports.
   */
  scheme: 'bearer';
  /**
   * The bearer token.
   */
  token: {
    bearer: string;
  };
};

/**
 * Type guard that returns `true` if `obj` satisfies the {@link TokenAttributes}
 * interface.
 */
export function isTokenAttributes(
  obj: unknown,
  { partial = false } = {}
): obj is TokenAttributes {
  const attribute = obj as TokenAttributes;
  let returnValue = false;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!!attribute && typeof attribute === 'object') {
    const isValidOwner = !!attribute.owner && typeof attribute.owner === 'string';

    const isValidGlobalAdmin =
      attribute.isGlobalAdmin === undefined ||
      typeof attribute.isGlobalAdmin === 'boolean';

    const allKeysAreValid = Object.keys(attribute).every((key) =>
      validTokenAttributes.includes(key as TokenAttribute)
    );

    if (allKeysAreValid) {
      returnValue = true;

      // eslint-disable-next-line unicorn/prefer-ternary
      if (partial) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        returnValue &&= attribute.owner === undefined || isValidOwner;
      } else {
        returnValue &&= isValidOwner;
      }

      returnValue &&= isValidGlobalAdmin;
    }
  }

  return returnValue;
}
