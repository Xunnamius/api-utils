[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/db](../README.md) / tokenAttributesUpdateToMongoUpdate

# Function: tokenAttributesUpdateToMongoUpdate()

> **tokenAttributesUpdateToMongoUpdate**(`update`): `object`

Defined in: [packages/api-strategy/src/auth/db.ts:97](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api-strategy/src/auth/db.ts#L97)

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
