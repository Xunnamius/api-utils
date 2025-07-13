import { getEnv } from '@-xun/env';
import { getDb, setSchemaConfig } from '@-xun/mongo-schema';

import { globalDebugLogger } from 'universe+api:constant.ts';
import { ErrorMessage } from 'universe+api:error.ts';

import type { DbSchema } from '@-xun/mongo-schema';
import type { DummyData } from '@-xun/mongo-test';
import type { EmptyObject } from 'type-fest';

import type {
  ExportedMiddleware,
  MiddlewareContext,
  ModernOrLegacyMiddleware
} from 'universe+api:types.ts';

const debug = globalDebugLogger.extend('connect-databases');

export type Options = {
  /**
   * Options specific to the connect-databases middleware.
   */
  database: {
    /**
     * A list of database names or aliases that will be initialized and hydrated
     * with dummy data when NODE_ENV starts with "development" and the
     * API_HYDRATE_DB environment variable is defined.
     *
     * Usually, "root" should always been listed here. Similarly, the similarly
     * well-known alias "app" should also usually be listed here.
     *
     * @default ['root', 'app']
     */
    hydrationTargets?: string[];
    /**
     * Passed to {@link setSchemaConfig} at the appropriate point.
     */
    schema: () => DbSchema;
    /**
     * Passed to {@link setDummyData} at the appropriate point.
     *
     * This function's contents become a no-op that is never run when outside of
     * a development environment (as determined by the NODE_ENV environment
     * variable).
     */
    data: () => DummyData;
  };
};

export type Context = EmptyObject;

/**
 * Sets the database schema(s) if the NODE_ENV environment variable starts with
 * "production" or "development". Additionally hydrates the database(s) with
 * dummy data if NODE_ENV starts with "development" and the API_HYDRATE_DB
 * environment variable is defined.
 *
 * This middleware will not pull in any non-production dependencies when used in
 * a production environment.
 */
export function makeMiddleware() {
  return async function (_reqOrRequest, resOrModernContext, maybeLegacyContext) {
    const isInLegacyMode = !!maybeLegacyContext;
    debug('entered middleware runtime (mode: %O)', isInLegacyMode ? 'LEGACY' : 'MODERN');

    const {
      options: { database }
    } = (isInLegacyMode ? maybeLegacyContext : resOrModernContext) as MiddlewareContext<
      Options,
      Context,
      ModernOrLegacyMiddleware<Options, Context>
    >;

    const isProduction = getEnv().NODE_ENV.startsWith('production');
    const isDevelopment = getEnv().NODE_ENV.startsWith('development');

    if (isProduction || isDevelopment) {
      setSchemaConfig(database.schema);
      debug('set global database schema');

      if (isDevelopment && getEnv().API_HYDRATE_DB) {
        const { hydrateDbWithDummyData, setDummyData } = (() => {
          try {
            return require(
              //{@symbiote/notInvalid @-xun/mongo-test}
              //{@symbiote/notExtraneous @-xun/mongo-test}
              // ? This expression stops webpack/turbopack from bundling things
              '@-xun/mongo-test'.toString()
            ) as typeof import('@-xun/mongo-test');
          } catch (error) {
            throw new Error(ErrorMessage.MissingMongoTestPackage(), { cause: error });
          }
        })();

        debug('executing api db initialize-and-hydrate directive');

        setDummyData(database.data);

        const { hydrationTargets = ['root', 'app'] } = database;

        await Promise.all(hydrationTargets.map((name) => getDb({ name })));

        debug('dbs initialized successfully: %O', hydrationTargets);

        await Promise.all(
          hydrationTargets.map((name) => hydrateDbWithDummyData({ name }))
        );

        debug('dbs hydrated successfully: %O', hydrationTargets);

        throw new Error(ErrorMessage.ApiHydrateDbSucceeded());
      } else {
        debug('skipped db initialize-and-hydrate directive');
      }
    } else {
      debug('skipped setting global database schema');
    }
  } satisfies ExportedMiddleware<Options, Context>;
}
