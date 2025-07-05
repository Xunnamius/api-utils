import { getEnv } from '@-xun/env';
import { getDb } from '@-xun/mongo-schema';
import { getClientIp } from 'request-ip';

import { getAuthorizationHeaderFromRequestLike } from 'multiverse+shared:next-like.ts';

import type { HttpStatusCode, UnixEpochMs } from '@-xun/types';
import type { WithId, WithoutId } from 'mongodb';

import type {
  NextApiRequestLike,
  NextApiResponseLike
} from 'multiverse+shared:next-like.ts';

/**
 * The shape of an entry in the well-known "request log" collection.
 */
export type InternalRequestLogEntry = WithId<{
  ip: string | null;
  header: string | null;
  route: string | null;
  endpoint: string | null;
  method: string | null;
  resStatusCode: HttpStatusCode;
  createdAt: UnixEpochMs;
  durationMs: number;
}>;

/**
 * The shape of a new entry in the well-known "request log" collection.
 */
export type NewRequestLogEntry = WithoutId<InternalRequestLogEntry>;

/**
 * This function adds a request metadata entry to the database.
 */
export async function addToRequestLog(options: {
  request: Request;
  response: Response;
  endpoint: string | null | undefined;
  durationMs: number;
}): Promise<void>;
/**
 * This function adds a request metadata entry to the database.
 *
 * Note that this async function **does not have to be awaited**. It's fire and
 * forget!
 *
 * @example
 * ```
 * doSomeStuff();
 * void addToRequestLog({ req, res, endpoint });
 * doSomeOtherStuff();
 * ```
 */
export async function addToRequestLog(options: {
  req: NextApiRequestLike;
  res: NextApiResponseLike;
  endpoint: string | null | undefined;
  durationMs: number;
}): Promise<void>;
export async function addToRequestLog(
  options: (
    | {
        req: NextApiRequestLike;
        res: NextApiResponseLike;
      }
    | { request: Request; response: Response }
  ) & {
    endpoint: string | null | undefined;
    durationMs: number;
  }
): Promise<void> {
  const { endpoint, durationMs } = options;
  const isInLegacyMode = !('request' in options);
  const reqOrRequest = isInLegacyMode ? options.req : options.request;

  const url =
    reqOrRequest.url && URL.canParse(reqOrRequest.url)
      ? new URL(reqOrRequest.url).pathname
      : reqOrRequest.url || null;

  if (!endpoint) {
    // eslint-disable-next-line no-console
    console.warn(
      `an API endpoint is missing its descriptor metadata at url: ${String(url)}`
    );
  }

  // TODO: turns out getting the IP is non-trivial. This need to be revisited!
  const ip = getClientIp(
    isInLegacyMode
      ? options.req
      : { headers: Object.fromEntries(options.request.headers.entries()) }
  );

  const authHeader =
    getAuthorizationHeaderFromRequestLike(reqOrRequest)
      ?.slice(0, getEnv().AUTH_HEADER_MAX_LENGTH)
      .toLowerCase() || null;

  const method = reqOrRequest.method?.toUpperCase() || null;

  await (await getDb({ name: 'root' }))
    .collection<NewRequestLogEntry>('request-log')
    .insertOne({
      ip,
      header: authHeader,
      method,
      route: url,
      endpoint: endpoint || null,
      resStatusCode: (isInLegacyMode
        ? options.res.statusCode
        : options.response.status) as HttpStatusCode,
      createdAt: Date.now(),
      durationMs
    });
}
