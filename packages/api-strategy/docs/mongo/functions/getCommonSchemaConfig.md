[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [mongo](../README.md) / getCommonSchemaConfig

# Function: getCommonSchemaConfig()

> **getCommonSchemaConfig**(`additionalSchemaConfig?`): `DbSchema`

Defined in: [packages/api-strategy/src/mongo/index.ts:12](https://github.com/Xunnamius/api-utils/blob/60a2178cffe0885ecc2a390e9b6bc795373b5e0b/packages/api-strategy/src/mongo/index.ts#L12)

A JSON representation of the backend Mongo database structure. This is used
for common consistent "well-known" db structure across projects.

Well-known databases and their well-known collections currently include:
  - `root` (collections: `auth`, `request-log`, `limited-log`)

## Parameters

### additionalSchemaConfig?

`DbSchema`

## Returns

`DbSchema`
