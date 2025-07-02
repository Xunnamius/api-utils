import { getEnv } from '@-xun/env';
import { getDb } from '@-xun/mongo-schema';
import { getClientIp } from 'request-ip';

import {
  getAuthorizationHeaderFromRequestLike,
  isNextApiRequestLike
} from 'multiverse+shared:next-like.ts';

import { ErrorMessage } from 'universe+api-strategy:error.ts';

import type { UnixEpochMs } from '@-xun/types';
import type { WithId, WithoutId } from 'mongodb';
import type { NextApiRequestLike } from 'multiverse+shared:next-like.ts';

/**
 * The shape of an entry in the well-known "limited log" collection.
 */
export type InternalLimitedLogEntry = WithId<
  | {
      until: UnixEpochMs;
      ip: string;
      header?: never;
    }
  | {
      until: UnixEpochMs;
      ip?: never;
      header: string;
    }
>;

/**
 * The shape of a new entry in the well-known "limited log" collection.
 */
export type NewLimitedLogEntry = WithoutId<InternalLimitedLogEntry>;

/**
 * @see {@link isClientRateLimited}
 */
export type IsClientRateLimitedReturnType = {
  isLimited: boolean;
  retryAfter: number;
};

/**
 * Returns an object with two keys: `isLimited` and `retryAfter`. If `isLimited`
 * is true, then the request should be rejected. The client should be instructed
 * to retry their request after `retryAfter` milliseconds have passed.
 */
export async function isClientRateLimited(
  request: Request
): Promise<IsClientRateLimitedReturnType>;
export async function isClientRateLimited(
  req: NextApiRequestLike
): Promise<IsClientRateLimitedReturnType>;
export async function isClientRateLimited(
  reqOrRequest: Request | NextApiRequestLike
): Promise<IsClientRateLimitedReturnType>;
export async function isClientRateLimited(reqOrRequest: Request | NextApiRequestLike) {
  const isInLegacyMode = !!isNextApiRequestLike(reqOrRequest);

  // TODO: turns out getting the IP is non-trivial. This need to be revisited!
  const ip = getClientIp(
    isInLegacyMode
      ? reqOrRequest
      : { headers: Object.fromEntries(reqOrRequest.headers.entries()) }
  );

  const authHeader = getAuthorizationHeaderFromRequestLike(reqOrRequest)
    ?.slice(0, getEnv().AUTH_HEADER_MAX_LENGTH)
    .toLowerCase();

  const limited = await (
    await getDb({ name: 'root' })
  )
    .collection<InternalLimitedLogEntry>('limited-log')
    .find({
      $or: [...(ip ? [{ ip }] : []), ...(authHeader ? [{ header: authHeader }] : [])],
      until: { $gt: Date.now() } // ? Skip the recently unbanned
    })
    .sort({ until: -1 })
    .limit(1)
    .next();

  return {
    isLimited: !!limited,
    retryAfter: Math.max(0, (limited?.until || Date.now()) - Date.now())
  };
}

/**
 * Removes a rate limit on a client matched against either `ip`, `header`, or
 * both. Matching against both removes rate limits that match either criterion.
 *
 * @returns The number of rate limits removed.
 */
export async function removeRateLimit(options: {
  target: { ip: string | undefined; header?: string } | undefined;
}): Promise<number>;
export async function removeRateLimit(options: {
  target: { ip?: string; header: string | undefined } | undefined;
}): Promise<number>;
export async function removeRateLimit({
  target
}: {
  target:
    | { ip: string | undefined; header?: string }
    | { ip?: string; header: string | undefined }
    | undefined;
}): Promise<number>;
export async function removeRateLimit({
  target
}: {
  target:
    | { ip: string | undefined; header?: string }
    | { ip?: string; header: string | undefined }
    | undefined;
}) {
  if (target) {
    const { ip, header } = target;

    if (ip !== undefined || header !== undefined) {
      if (ip !== undefined && (typeof ip !== 'string' || !ip)) {
        throw new Error(ErrorMessage.InvalidEmptyIp());
      }

      if (header !== undefined && (typeof header !== 'string' || !header)) {
        throw new Error(ErrorMessage.InvalidEmptyHeader());
      }

      const now = Date.now();
      const result = await (await getDb({ name: 'root' }))
        .collection<InternalLimitedLogEntry>('limited-log')
        .updateMany(
          {
            $or: [...(ip ? [{ ip }] : []), ...(header ? [{ header }] : [])],
            until: { $gt: now } // ? Skip the recently unbanned
          },
          { $set: { until: now } }
        );

      return result.modifiedCount;
    }
  }

  throw new Error(ErrorMessage.NeedsEitherIpOrHeader());
}

/**
 * Retrieve all active rate limits.
 */
export async function getAllRateLimits() {
  return (await getDb({ name: 'root' }))
    .collection<InternalLimitedLogEntry>('limited-log')
    .find<WithoutId<InternalLimitedLogEntry>>(
      { until: { $gt: Date.now() } },
      { sort: { _id: -1 }, projection: { _id: false } }
    )
    .toArray();
}
