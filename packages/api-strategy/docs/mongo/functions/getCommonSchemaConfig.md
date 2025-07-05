[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [mongo](../README.md) / getCommonSchemaConfig

# Function: getCommonSchemaConfig()

> **getCommonSchemaConfig**(`additionalSchemaConfig?`): `DbSchema`

Defined in: [packages/api-strategy/src/mongo/index.ts:12](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/mongo/index.ts#L12)

A JSON representation of the backend Mongo database structure. This is used
for common consistent "well-known" db structure across projects.

Well-known databases and their well-known collections currently include:
  - `root` (collections: `auth`, `request-log`, `limited-log`)

## Parameters

### additionalSchemaConfig?

`DbSchema`

## Returns

`DbSchema`
