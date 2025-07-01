import { getDb } from '@-xun/mongo-schema';

import type { Collection } from 'mongodb';
import type { Exact } from 'type-fest';

import type {
  InternalAuthEntry,
  PublicAuthEntry,
  SafePublicAuthEntry,
  TokenAttributes,
  TokenAttributesFilter
} from 'universe+api-strategy:auth/types.ts';

/**
 * A MongoDB cursor projection that transforms an internal auth entry (or
 * "token") into an unsafe public auth entry.
 *
 * **WARNING: the "public" auth entry contains sensitive information and is only
 * meant to be returned by privileged processes and endpoints!**
 */
export const publicAuthEntryProjection = {
  _id: false,
  auth_id: { $toString: '$_id' },
  attributes: true,
  token: true
};

/**
 * A MongoDB cursor projection that transforms an internal auth entry (or
 * "token") into a safe public auth entry with no sensitive information.
 */
export const { token: _, ...safePublicAuthEntryProjection } = publicAuthEntryProjection;

/**
 * Return the well-known "auth" collection after calling {@link getDb} on the
 * `'root'` database.
 */
export async function getAuthDb(): Promise<Collection<InternalAuthEntry>> {
  return (await getDb({ name: 'root' })).collection('auth');
}

/**
 * Transform an internal entry from the well-known "auth" MongoDB collection
 * into one that is safe for consumption by privileged units.
 */
export function toPublicAuthEntry(entry: InternalAuthEntry): PublicAuthEntry {
  const {
    _id,
    deleted: _,
    ...publicEntry
  } = { ...entry, auth_id: entry._id.toString() };

  return publicEntry satisfies Exact<PublicAuthEntry, typeof publicEntry>;
}

/**
 * Transform an internal entry from the well-known "auth" MongoDB collection
 * into one that is safe for consumption by non-privileged units.
 */
export function toSafePublicAuthEntry(entry: InternalAuthEntry): SafePublicAuthEntry {
  const {
    _id,
    deleted: _,
    token: __,
    ...publicEntry
  } = { ...entry, auth_id: entry._id.toString() };

  return publicEntry satisfies Exact<SafePublicAuthEntry, typeof publicEntry>;
}

/**
 * Transforms `filter`, the token attributes filter, into a MongoDb update
 * filter with equivalent meaning.
 *
 * Note that an `undefined` value for a boolean-accepting property will check
 * for non-existence only, while a `false` value will check for both falseness
 * (expected) but also non-existence too.
 */
export function tokenAttributesFilterToMongoFilter(filter: TokenAttributesFilter) {
  return {
    // TODO: Queries on owner are covered by the index. Maybe others
    // TODO: should too?
    ...(filter.owner !== undefined
      ? { 'attributes.owner': { $in: [filter.owner].flat() } }
      : {}),
    ...(filter.isGlobalAdmin !== undefined
      ? { 'attributes.isGlobalAdmin': filter.isGlobalAdmin || { $in: [null, false] } }
      : {}),
    deleted: false
  };
}

/**
 * Transforms `update`, a patch to update  {@link TokenAttributes} in the
 * MongoDb "auth" collection, into a valid MongoDb update expression.
 */
export function tokenAttributesUpdateToMongoUpdate(update: Partial<TokenAttributes>) {
  return {
    $set: {
      ...(update.owner !== undefined ? { 'attributes.owner': update.owner } : {}),
      ...(update.isGlobalAdmin !== undefined
        ? { 'attributes.isGlobalAdmin': update.isGlobalAdmin }
        : {})
    }
  };
}
