[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [mongo](../README.md) / getCommonSchemaConfig

# Function: getCommonSchemaConfig()

> **getCommonSchemaConfig**(`additionalSchemaConfig?`): `DbSchema`

Defined in: [packages/api-strategy/src/mongo/index.ts:12](https://github.com/Xunnamius/api-utils/blob/3905fc4975c9f15e022202427b124cf715fcf3dc/packages/api-strategy/src/mongo/index.ts#L12)

A JSON representation of the backend Mongo database structure. This is used
for common consistent "well-known" db structure across projects.

Well-known databases and their well-known collections currently include:
  - `root` (collections: `auth`, `request-log`, `limited-log`)

## Parameters

### additionalSchemaConfig?

`DbSchema`

## Returns

`DbSchema`
