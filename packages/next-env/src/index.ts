import { validHttpMethods } from '@-xun/types';
import { parse as parseAsBytes } from 'bytes';
import { createDebugLogger } from 'rejoinder';

import { ErrorMessage } from 'universe+next-env:error.ts';

import type { ValidHttpMethod } from '@-xun/types';
import type { Primitive } from 'type-fest';

const debug = createDebugLogger({ namespace: 'next-env' });

/**
 * This method takes an environment variable value (string), removes illegal
 * characters, and then splits the string by its commas, returning the resulting
 * array with all nullish members filtered out.
 */
export const arrayFromEnvironmentValue = (envVal: string) => {
  return envVal
    .replaceAll(/[^\w*,-^~]+/g, '')
    .split(',')
    .filter(Boolean);
};

export type Environment = Record<string, Primitive | Primitive[]>;

/**
 * Returns an object representing the current runtime environment. Performs
 * light validation.
 *
 * Note that this method does not invoke dotenv or load any .env files or
 * otherwise affect `process.env`. The environment must be mutated manually.
 */
export function getEnv<T extends Environment>(customizedEnv?: T) {
  debug('environment definitions (resolved as NODE_ENV) listed in order of precedence:');
  debug(`APP_ENV: %O`, process.env.APP_ENV ?? '(undefined)');
  debug(`NODE_ENV: %O`, (process.env.NODE_ENV as unknown) ?? '(undefined)');
  debug(`BABEL_ENV: %O`, process.env.BABEL_ENV ?? '(undefined)');

  const env = {
    NODE_ENV:
      process.env.APP_ENV ||
      (process.env.NODE_ENV as string) ||
      process.env.BABEL_ENV ||
      'unknown',
    MONGODB_URI: process.env.MONGODB_URI || '',
    MONGODB_MS_PORT: process.env.MONGODB_MS_PORT
      ? Number(process.env.MONGODB_MS_PORT)
      : null,
    DISABLED_API_VERSIONS: process.env.DISABLED_API_VERSIONS
      ? arrayFromEnvironmentValue(process.env.DISABLED_API_VERSIONS.toLowerCase())
      : [],
    RESULTS_PER_PAGE: Number(process.env.RESULTS_PER_PAGE) || 100,
    IGNORE_RATE_LIMITS:
      !!process.env.IGNORE_RATE_LIMITS && process.env.IGNORE_RATE_LIMITS !== 'false',
    LOCKOUT_ALL_CLIENTS:
      !!process.env.LOCKOUT_ALL_CLIENTS && process.env.LOCKOUT_ALL_CLIENTS !== 'false',
    DISALLOWED_METHODS: process.env.DISALLOWED_METHODS
      ? arrayFromEnvironmentValue(process.env.DISALLOWED_METHODS.toUpperCase())
      : [],
    MAX_CONTENT_LENGTH_BYTES:
      parseAsBytes(process.env.MAX_CONTENT_LENGTH_BYTES ?? '-Infinity') || 50_000,
    AUTH_HEADER_MAX_LENGTH: Number(process.env.AUTH_HEADER_MAX_LENGTH) || 500,
    DEBUG: process.env.DEBUG ?? null,
    DEBUG_INSPECTING: !!process.env.VSCODE_INSPECTOR_OPTIONS,
    REQUESTS_PER_CONTRIVED_ERROR: Number(process.env.REQUESTS_PER_CONTRIVED_ERROR) || 0,

    ...customizedEnv
  };

  debug('resolved env vars:');
  debug(env);

  /* istanbul ignore next */
  if (env.NODE_ENV !== 'test') {
    const errors = [];

    if (env.NODE_ENV === 'unknown') {
      errors.push(ErrorMessage.UnexpectedEmptyOrMissing('NODE_ENV', env.NODE_ENV));
    }

    if (env.MONGODB_URI === '') {
      errors.push(ErrorMessage.UnexpectedEmptyOrMissing('MONGODB_URI', env.MONGODB_URI));
    }

    ensureGreaterThanOrEqualToZero('RESULTS_PER_PAGE');
    ensureGreaterThanOrEqualToZero('MAX_CONTENT_LENGTH_BYTES');
    ensureGreaterThanOrEqualToZero('AUTH_HEADER_MAX_LENGTH');

    env.DISALLOWED_METHODS.forEach((method) => {
      if (!validHttpMethods.includes(method as ValidHttpMethod)) {
        errors.push(ErrorMessage.UnknownHttpMethod(method, validHttpMethods));
      }
    });

    if (env.MONGODB_MS_PORT && env.MONGODB_MS_PORT <= 1024) {
      errors.push(ErrorMessage.BadMongoMsPort());
    }

    if (errors.length) {
      throw new Error(ErrorMessage.BadVariables(errors));
    }

    function ensureGreaterThanOrEqualToZero(name: keyof typeof env) {
      const value = env[name];

      if (typeof value !== 'number' || Number.isNaN(value) || value < 0) {
        errors.push(ErrorMessage.UnexpectedNegativeNumber(name, value));
      }
    }
  }

  return env as typeof env & T;
}
