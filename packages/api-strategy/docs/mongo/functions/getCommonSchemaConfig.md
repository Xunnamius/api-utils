[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [mongo](../README.md) / getCommonSchemaConfig

# Function: getCommonSchemaConfig()

> **getCommonSchemaConfig**(`additionalSchemaConfig?`): `DbSchema`

Defined in: [mongo/index.ts:12](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/mongo/index.ts#L12)

A JSON representation of the backend Mongo database structure. This is used
for common consistent "well-known" db structure across projects.

Well-known databases and their well-known collections currently include:
  - `root` (collections: `auth`, `request-log`, `limited-log`)

## Parameters

### additionalSchemaConfig?

`DbSchema`

## Returns

`DbSchema`
