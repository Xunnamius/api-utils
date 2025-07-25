import { getEnv } from '@-xun/env';

import { getArktype } from 'multiverse+shared:arktype.ts';

import type { Out, Type } from 'arktype';
import type { ObjectId, WithId } from 'mongodb';

let typesScope = undefined as undefined | Validators;

/**
 * @see {@link getValidators}
 */
export type Validators = {
  toToken: Type<(In: string) => Out<string>>;
  AuthorizationHeader: Type<string>;
  NewAuthEntry: Type<NewAuthEntry>;
  Token: Type<Token>;
  TokenAttributes: Type<TokenAttributes>;
  TokenAttributesFilter: Type<TokenAttributesFilter>;
};

/**
 * Instantiate and return runtime versions of various types. Useful for
 * validation and transforms.
 */
export async function getValidators() {
  if (typesScope) {
    return typesScope;
  }

  const { type, scope } = await getArktype();

  const $ = scope({
    AuthorizationHeader: () =>
      $.type(/^\S+ \S/).atMostLength(getEnv().AUTH_HEADER_MAX_LENGTH),
    '#NonEmptyLimitedString': type('0 < string <= 100'),
    NewAuthEntry: {
      attributes: 'TokenAttributes'
    },
    Token: () => $.type('NonEmptyLimitedString').as<Token>(),
    TokenAttributes: {
      owner: 'NonEmptyLimitedString',
      'isGlobalAdmin?': 'boolean'
    },
    TokenAttributesFilter: function () {
      return $.type({
        owner: 'NonEmptyLimitedString | NonEmptyLimitedString[]',
        isGlobalAdmin: 'boolean'
      }).partial();
    }
  });

  const types_ = $.export();
  const types = {
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    ...types_,
    toToken: types_.AuthorizationHeader.pipe((h) => h.split(' ').at(-1)!)
  } as unknown as Validators;

  typesScope = types;
  return types;
}

/**
 * The shape of a new entry in the well-known "auth" collection.
 */
export type NewAuthEntry = {
  /**
   * Metadata attributes associated with this new "auth" entry.
   *
   * **WARNING: Token attributes should NEVER contain sensitive or confidential
   * information!**
   */
  attributes: TokenAttributes;
};

/**
 * The shape of an entry in the well-known "auth" collection.
 */
export type InternalAuthEntry = WithId<{
  /**
   * Metadata indicating if an entry has been soft-deleted or not. If `deleted` is `true`, this entry will be ignored by the other CRUD functions.
   */
  token: Token;
  /**
   * Metadata attributes associated with this "auth" entry.
   *
   * **WARNING: Token attributes should NEVER contain sensitive or confidential
   * information!**
   */
  attributes: TokenAttributes;
  /**
   * Metadata indicating if an entry has been soft-deleted or not. If `deleted`
   * is `true`, this entry will be ignored by the other CRUD functions.
   */
  deleted: boolean;
}>;

/**
 * The shape of the actual token contained within an entry in the well-known
 * "auth" collection.
 */
// ? The `& {}` makes the type semi-"opaque"
export type Token = string & {};

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
   * If `true`, the token grants access to potentially dangerous abilities.
   *
   * @default undefined
   */
  isGlobalAdmin?: boolean;
};

/**
 * The shape of a filter used to search through the well-known "auth"
 * collection for matching entries.
 */
export type TokenAttributesFilter = Partial<{
  /**
   * As a string, this represents the target _owner_ of the target token. As an
   * array, this represents the _acceptable owners_ of the target token(s).
   */
  owner: string | string[];
  /**
   * The target global administrator status of the target token(s).
   *
   * Note that filtering for `false` here will also match entries with
   * attributes where this property is missing.
   */
  isGlobalAdmin: boolean;
}>;

/**
 * The public base shape derived from an entry in the well-known "auth"
 * collection.
 */
export type PublicAuthEntry = Pick<InternalAuthEntry, 'attributes' | 'token'> & {
  /**
   * A string representation of the ObjectId associated with this entry.
   */
  auth_id: string;
};

/**
 * A version of {@link } that excludes `token`, making it "safe" to reveal this
 * data structure publicly (e.g. in logs and other output).
 */
export type SafePublicAuthEntry = Omit<PublicAuthEntry, 'token'>;

/**
 * An array of items that can be coerced into {@link ObjectId} instances, or are
 * `undefined`.
 */
export type MaybeAuthId = string | ObjectId | undefined;
