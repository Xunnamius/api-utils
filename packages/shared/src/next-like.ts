/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * An object that is probably a `NextApiRequest`.
 */
export interface NextApiRequestLike extends IncomingMessage {
  query: Partial<{
    [key: string]: string | string[];
  }>;
  cookies: Partial<{
    [key: string]: string;
  }>;
  body: any;
  env: {
    [key: string]: string | undefined;
  };
  draftMode?: boolean;
  preview?: boolean;
  previewData?: string | false | object | undefined;
}

/**
 * An object that is probably a `NextApiResponse`.
 */
export type NextApiResponseLike = ServerResponse & {
  send: (body: any) => void;
  json: (body: any) => void;
  status: (statusCode: number) => NextApiResponseLike;
  redirect(url: string): NextApiResponseLike;
  redirect(status: number, url: string): NextApiResponseLike;
  setDraftMode: (options: { enable: boolean }) => NextApiResponseLike;
  setPreviewData: (
    data: object | string,
    options?: {
      maxAge?: number;
      path?: string;
    }
  ) => NextApiResponseLike;
  clearPreviewData: (options?: { path?: string }) => NextApiResponseLike;
  revalidate: (
    urlPath: string,
    // eslint-disable-next-line unicorn/prevent-abbreviations
    opts?: {
      unstable_onlyGenerated?: boolean;
    }
  ) => Promise<void>;
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

/**
 * Accepts an authorization header string or something resembling a
 * {@link Request} and returns either an authorization header string or
 * `undefined`.
 */
export function getAuthorizationHeaderFromRequestLike(
  client: string | NextApiRequestLike | Request
) {
  let header: string | undefined;

  if (typeof client === 'string') {
    header = client;
  } else if (isNextApiRequestLike(client)) {
    header = client.headers.authorization;
  } else {
    header = client.headers.get('authorization') || undefined;
  }

  header ||= undefined;

  return header;
}
