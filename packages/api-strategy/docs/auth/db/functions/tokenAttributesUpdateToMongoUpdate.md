[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/db](../README.md) / tokenAttributesUpdateToMongoUpdate

# Function: tokenAttributesUpdateToMongoUpdate()

> **tokenAttributesUpdateToMongoUpdate**(`update`): `object`

Defined in: [auth/db.ts:97](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/auth/db.ts#L97)

Transforms `update`, a patch to update  [TokenAttributes](../../types/type-aliases/TokenAttributes.md) in the
MongoDb "auth" collection, into a valid MongoDb update expression.

## Parameters

### update

`Partial`\<[`TokenAttributes`](../../types/type-aliases/TokenAttributes.md)\>

## Returns

`object`

### $set

> **$set**: `object`

#### $set.attributes.isGlobalAdmin?

> `optional` **isGlobalAdmin**: `boolean` = `update.isGlobalAdmin`

#### $set.attributes.owner?

> `optional` **owner**: `string` = `update.owner`
