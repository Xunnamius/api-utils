import { getDb } from '@-xun/mongo-schema';

import type { Exact } from 'type-fest';

import type {
  InternalAuthEntry,
  PublicAuthEntry,
  TokenAttributes,
  TokenAttributesFilter
} from 'universe+api-strategy:auth/types.ts';

/**
 * A MongoDB cursor projection that transforms an internal auth entry (or
 * "token") into a public auth entry.
 */
export const publicAuthEntryProjection = {
  _id: false,
  auth_id: { $toString: '$_id' },
  attributes: true
};

/**
 * Return the well-known "auth" collection after calling {@link getDb} on the
 * `'root'` database.
 */
export async function getAuthDb() {
  return (await getDb({ name: 'root' })).collection<InternalAuthEntry>('auth');
}

/**
 * Transform an internal entry from the well-known "auth" MongoDB collection
 * into one that is safe for consumption.
 */
export function toPublicAuthEntry(entry: InternalAuthEntry): PublicAuthEntry {
  const {
    _id,
    deleted: _,
    token: __,
    ...publicEntry
  } = { ...entry, auth_id: entry._id.toString() };

  return publicEntry satisfies Exact<PublicAuthEntry, typeof publicEntry>;
}

/**
 * Transforms `filter`, the token attributes filter, into a MongoDb update
 * filter with equivalent meaning.
 */
export function tokenAttributesFilterToMongoFilter(filter: TokenAttributesFilter) {
  return {
    // TODO: Queries on owner are covered by the index. Maybe others
    // TODO: should too?
    ...(filter.owner !== undefined
      ? { 'attributes.owner': { $in: [filter.owner].flat() } }
      : {}),
    ...(filter.isGlobalAdmin !== undefined
      ? { 'attributes.isGlobalAdmin': filter.isGlobalAdmin }
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
