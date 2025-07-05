import { randomUUID as generateUUID } from 'node:crypto';

import { itemToObjectId } from '@-xun/mongo-item';
import { MongoServerError, ObjectId } from 'mongodb';

import { getAuthorizationHeaderFromRequestLike } from 'multiverse+shared:next-like.ts';

import {
  getAuthDb,
  publicAuthEntryProjection,
  safePublicAuthEntryProjection,
  tokenAttributesFilterToMongoFilter,
  tokenAttributesUpdateToMongoUpdate,
  toPublicAuthEntry,
  toSafePublicAuthEntry
} from 'universe+api-strategy:auth/db.ts';

import { getValidators } from 'universe+api-strategy:auth/types.ts';
import { globalDebugLogger } from 'universe+api-strategy:constant.ts';
import { AuthError, ErrorMessage } from 'universe+api-strategy:error.ts';

import type { LiteralUnknownUnion } from '@-xun/types';
import type { NextApiRequestLike } from 'multiverse+shared:next-like.ts';

import type {
  InternalAuthEntry,
  MaybeAuthId,
  NewAuthEntry,
  PublicAuthEntry,
  SafePublicAuthEntry,
  TokenAttributes,
  TokenAttributesFilter
} from 'universe+api-strategy:auth/types.ts';

/**
 * Used as the MongoDb query resultset limit. The API will never return more
 * JSON objects than this number.
 *
 * If this number is not positive, behavior is undefined.
 */
const MAX_RESULTS_PER_PAGE = 100;

const debug = globalDebugLogger.extend('auth');

export * from 'universe+api-strategy:auth/types.ts';
export * from 'universe+api-strategy:auth/well-known-tokens.ts';

/**
 * @see {getAuthedClientToken}
 */
export type GetAuthedClientTokenOptions = Partial<{
  /**
   * Additionally authenticate a client by narrowing matching to only those
   * tokens that satisfy `filter`.
   *
   * An empty `filter` object will return all tokens.
   *
   * @default undefined
   */
  filter?: TokenAttributesFilter;
  /**
   * If set to `'reject'`, this function will throw (reject its promise) if no
   * matching token can be found.
   *
   * @default 'return-undefined'
   */
  errorBehavior?: 'return-undefined' | 'reject';
}>;

/**
 * Authenticates a client (via bearer token) to continue past the point where
 * this function was invoked. Additional authorization can be performed via the
 * `filter` option.
 *
 * Authentication (and authorization) is accomplished by checking their
 * Authorization header against entries in the well-known "auth" MongoDB
 * collection.
 *
 * By default this function returns `undefined` (i.e. **does not throw**) if the
 * client cannot be authed.
 *
 * WARNING: this function **DOES NOT** throw on auth failure (by default)!
 */
export async function getAuthedClientToken(
  req: NextApiRequestLike,
  options?: GetAuthedClientTokenOptions
): Promise<SafePublicAuthEntry | undefined>;
export async function getAuthedClientToken(
  request: Request,
  options?: GetAuthedClientTokenOptions
): Promise<SafePublicAuthEntry | undefined>;
export async function getAuthedClientToken(
  authorizationHeader: string,
  options?: GetAuthedClientTokenOptions
): Promise<SafePublicAuthEntry | undefined>;
export async function getAuthedClientToken(
  client: NextApiRequestLike | Request | string,
  options?: GetAuthedClientTokenOptions
): Promise<SafePublicAuthEntry | undefined>;
export async function getAuthedClientToken(
  client: NextApiRequestLike | Request | string,
  options?: GetAuthedClientTokenOptions
): Promise<SafePublicAuthEntry | undefined> {
  const header = getAuthorizationHeaderFromRequestLike(client);

  if (header) {
    try {
      const { TokenAttributesFilter, toToken } = await getValidators();

      const filter = tokenAttributesFilterToMongoFilter(
        options?.filter ? TokenAttributesFilter.assert(options.filter) : {}
      );

      const entry = await (
        await getAuthDb()
      ).findOne<SafePublicAuthEntry>(
        { token: toToken.from(header), ...filter },
        { projection: safePublicAuthEntryProjection }
      );

      if (entry) {
        return entry;
      }
    } catch (error) {
      debug.error('auth failure: %O', error);

      if (options?.errorBehavior === 'reject') {
        throw new AuthError(ErrorMessage.AuthAttemptFailed());
      }
    }
  }

  if (options?.errorBehavior === 'reject') {
    debug.error('auth failure: %O', 'missing authorization header');
    throw new AuthError(ErrorMessage.AuthAttemptFailed());
  }

  return undefined;
}

type CreateTokenOptions = {
  /**
   * Data used to generate a new "auth" entry in the well-known "auth" MongoDB
   * collection
   */
  data: LiteralUnknownUnion<NewAuthEntry>;
  /**
   * If `true`, `token` will be included in the returned object.
   *
   * @default true
   */
  includeToken?: boolean;
};

/**
 * Generates a new bearer token and auth entry in the well-known "auth" MongoDB
 * collection.
 *
 * Throws on invalid input.
 */
export async function createToken(
  options: CreateTokenOptions & { includeToken: true }
): Promise<PublicAuthEntry>;
export async function createToken(
  options: CreateTokenOptions & { includeToken?: false }
): Promise<SafePublicAuthEntry>;
export async function createToken(
  options: CreateTokenOptions
): Promise<PublicAuthEntry | SafePublicAuthEntry>;
export async function createToken({
  data,
  includeToken = true
}: CreateTokenOptions): Promise<PublicAuthEntry | SafePublicAuthEntry> {
  const { NewAuthEntry } = await getValidators();
  const entry = NewAuthEntry.assert(data);

  const draftToken: InternalAuthEntry = {
    _id: new ObjectId(),
    deleted: false,
    attributes: entry.attributes,
    token: generateUUID()
  };

  try {
    await (await getAuthDb()).insertOne(draftToken);
  } catch (error) {
    // eslint-disable-next-line no-restricted-syntax
    throw error instanceof MongoServerError && error.code === 11_000
      ? new Error(ErrorMessage.TokenCollision())
      : error;
  }

  return includeToken
    ? toPublicAuthEntry(draftToken)
    : toSafePublicAuthEntry(draftToken);
}

/**
 * Returns entries corresponding to the given `_id`s (`auth_ids`) in the
 * well-known "auth" MongoDB collection.
 *
 * Throws on invalid input.
 */
export async function getTokens(options: {
  /**
   * {@link ObjectId}s corresponding to tokens in the well-known "auth" MongoDb
   * collection.
   */
  auth_ids: MaybeAuthId[];
}): Promise<PublicAuthEntry[]>;
/**
 * Returns entries matching the given `filter` in the well-known "auth" MongoDB
 * collection.
 *
 * Throws on invalid input.
 */
export async function getTokens(options: {
  /**
   * Only those tokens that satisfy {@link TokenAttributesFilter} are returned.
   */
  filter: LiteralUnknownUnion<TokenAttributesFilter>;
  /**
   * Only return tokens with ids that occur "after" (i.e. are less than)
   * `after_id`.
   */
  after_id?: MaybeAuthId;
}): Promise<PublicAuthEntry[]>;
export async function getTokens(
  options:
    | {
        auth_ids: MaybeAuthId[];
      }
    | {
        filter: LiteralUnknownUnion<TokenAttributesFilter>;
        after_id?: MaybeAuthId;
      }
): Promise<PublicAuthEntry[]> {
  const db = await getAuthDb();
  const { TokenAttributesFilter } = await getValidators();

  if ('auth_ids' in options) {
    const entries = await db
      .find<PublicAuthEntry>(
        { _id: { $in: itemToObjectId(options.auth_ids) }, deleted: false },
        { projection: publicAuthEntryProjection, limit: MAX_RESULTS_PER_PAGE }
      )
      .toArray();

    return entries;
  }

  const entries = await db
    .find<PublicAuthEntry>(
      {
        ...(options.after_id ? { _id: { $lt: itemToObjectId(options.after_id) } } : {}),
        ...tokenAttributesFilterToMongoFilter(
          TokenAttributesFilter.assert(options.filter)
        )
      },
      {
        projection: publicAuthEntryProjection,
        limit: MAX_RESULTS_PER_PAGE
      }
    )
    .toArray();

  return entries;
}

/**
 * Updates entries corresponding to the given `_id`s (`auth_ids`) in the
 * well-known "auth" MongoDB collection.
 *
 * Throws on invalid input.
 *
 * **WARNING: `update` is used to _patch_, not replace, the existing attributes
 * objects.**
 */
export async function updateTokensAttributes(options: {
  /**
   * {@link ObjectId}s corresponding to tokens in the well-known "auth" MongoDb
   * collection.
   */
  auth_ids: MaybeAuthId[];
  /**
   * Data used to patch the auth entry's attributes.
   */
  data: LiteralUnknownUnion<TokenAttributes>;
}): Promise<number>;
/**
 * Updates entries matching the given `filter` in the well-known "auth" MongoDB
 * collection.
 *
 * Throws on invalid input.
 *
 * **WARNING: `update` is used to _patch_, not replace, the existing attributes
 * objects.**
 */
export async function updateTokensAttributes(options: {
  /**
   * Only those tokens that satisfy {@link TokenAttributesFilter} are updated.
   */
  filter: LiteralUnknownUnion<TokenAttributesFilter>;
  /**
   * Data used to patch the auth entry's attributes.
   */
  data: LiteralUnknownUnion<TokenAttributes>;
}): Promise<number>;
export async function updateTokensAttributes(
  options:
    | {
        auth_ids: MaybeAuthId[];
        data: LiteralUnknownUnion<TokenAttributes>;
      }
    | {
        filter: LiteralUnknownUnion<TokenAttributesFilter>;
        data: LiteralUnknownUnion<TokenAttributes>;
      }
): Promise<number> {
  const { TokenAttributes, TokenAttributesFilter } = await getValidators();
  const attributes = TokenAttributes.partial().assert(options.data);

  if ('auth_ids' in options) {
    const { modifiedCount } = await (
      await getAuthDb()
    ).updateMany(
      { _id: { $in: itemToObjectId(options.auth_ids) }, deleted: false },
      tokenAttributesUpdateToMongoUpdate(attributes)
    );

    return modifiedCount;
  }

  const { modifiedCount } = await (
    await getAuthDb()
  ).updateMany(
    tokenAttributesFilterToMongoFilter(TokenAttributesFilter.assert(options.filter)),
    tokenAttributesUpdateToMongoUpdate(attributes)
  );

  return modifiedCount;
}

/**
 * Deletes entries corresponding to the given `_id`s (`auth_ids`) in the
 * well-known "auth" MongoDB collection.
 *
 * Throws on invalid input.
 *
 * Deleted entries remain in the system but in a deactivated state. They cannot
 * be reactivated or otherwise interacted with once deactivated.
 */
export async function deleteTokens(options: {
  /**
   * {@link ObjectId}s corresponding to tokens in the well-known "auth" MongoDb
   * collection.
   */
  auth_ids: MaybeAuthId[];
}): Promise<number>;
/**
 * Deletes entries matching the given `filter` in the well-known "auth" MongoDB
 * collection.
 *
 * Throws on invalid input.
 *
 * Deleted entries remain in the system but in a deactivated state. They cannot
 * be reactivated or otherwise interacted with once deactivated.
 */
export async function deleteTokens(options: {
  /**
   * Only those tokens that satisfy {@link TokenAttributesFilter} are deleted.
   */
  filter: LiteralUnknownUnion<TokenAttributesFilter>;
}): Promise<number>;
export async function deleteTokens(
  options:
    | {
        auth_ids: MaybeAuthId[];
      }
    | {
        filter: LiteralUnknownUnion<TokenAttributesFilter>;
      }
): Promise<number> {
  const { TokenAttributesFilter } = await getValidators();

  if ('auth_ids' in options) {
    const { modifiedCount } = await (
      await getAuthDb()
    ).updateMany(
      { _id: { $in: itemToObjectId(options.auth_ids) } },
      { $set: { deleted: true } }
    );

    return modifiedCount;
  }

  const { modifiedCount } = await (
    await getAuthDb()
  ).updateMany(
    tokenAttributesFilterToMongoFilter(TokenAttributesFilter.assert(options.filter)),
    { $set: { deleted: true } }
  );

  return modifiedCount;
}
