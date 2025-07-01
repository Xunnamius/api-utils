import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * An object that is probably a `NextApiRequest`.
 */
export type NextApiRequestLike = IncomingMessage & {
  /**
   * Object of `cookies` from header
   */
  cookies: Partial<{
    [key: string]: string;
  }>;
};

/**
 * An object that is probably a `NextApiResponse`.
 */
export type NextApiResponseLike = ServerResponse & {
  status: (statusCode: number) => NextApiResponseLike;
  /**
   * Send data `any` data in response
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send: (body: any) => void;
};

/**
 * Returns `true` if `o` is similar enough to a {@link NextApiRequestLike}
 * without having to import the entire `next` package.
 */
export function isNextApiRequestLike(o: unknown): o is NextApiRequestLike {
  return (
    !!o &&
    typeof o === 'object' &&
    'headers' in o &&
    !!o.headers &&
    typeof o.headers === 'object' &&
    !('get' in o.headers)
  );
}

/**
 * Returns `true` if `o` is similar enough to a {@link NextApiResponseLike}
 * without having to import the entire `next` package.
 */
export function isNextApiResponseLike(o: unknown): o is NextApiResponseLike {
  return !!o && typeof o === 'object' && 'send' in o;
}
