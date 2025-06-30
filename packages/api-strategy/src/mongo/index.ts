import { ErrorMessage } from 'universe+api-strategy:error.ts';

import type { DbSchema } from '@-xun/mongo-schema';

/**
 * A JSON representation of the backend Mongo database structure. This is used
 * for common consistent "well-known" db structure across projects.
 *
 * Well-known databases and their well-known collections currently include:
 *   - `root` (collections: `auth`, `request-log`, `limited-log`)
 */
export function getCommonSchemaConfig(additionalSchemaConfig?: DbSchema): DbSchema {
  const schema: DbSchema = {
    databases: {
      root: {
        collections: [
          {
            name: 'auth',
            indices: [
              { spec: 'attributes.owner' },
              { spec: 'deleted' },
              // ! When performing equality matches on embedded documents, field
              // ! order matters and the embedded documents must match exactly.
              // * https://xunn.at/mongo-docs-query-embedded-docs
              // ! Additionally, field order determines internal sort order.
              { spec: 'token', options: { unique: true } }
            ]
          },
          {
            name: 'request-log',
            indices: [{ spec: 'header' }, { spec: 'ip' }, { spec: 'durationMs' }]
          },
          {
            name: 'limited-log',
            indices: [{ spec: 'header' }, { spec: 'ip' }, { spec: { until: -1 } }]
          }
        ]
      },
      ...additionalSchemaConfig?.databases
    },
    aliases: { ...additionalSchemaConfig?.aliases }
  };

  const actualDatabaseNames = Object.keys(schema.databases);

  Object.entries(schema.aliases).forEach(([alias, actual]) => {
    if (!actualDatabaseNames.includes(actual)) {
      throw new Error(
        ErrorMessage.AliasedDatabaseNotAliasable(actual, alias, actualDatabaseNames)
      );
    }

    if (actualDatabaseNames.includes(alias)) {
      throw new Error(ErrorMessage.InvalidDatabaseAlias(actual, alias));
    }
  });

  return schema;
}
