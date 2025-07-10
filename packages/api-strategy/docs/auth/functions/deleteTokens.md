[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / deleteTokens

# Function: deleteTokens()

## Call Signature

> **deleteTokens**(`options`): `Promise`\<`number`\>

Defined in: [packages/api-strategy/src/auth.ts:353](https://github.com/Xunnamius/api-utils/blob/ee7740d17f3fcf19933c048d9a79c5c0520267a8/packages/api-strategy/src/auth.ts#L353)

Deletes entries corresponding to the given `_id`s (`auth_ids`) in the
well-known "auth" MongoDB collection.

Throws on invalid input.

Deleted entries remain in the system but in a deactivated state. They cannot
be reactivated or otherwise interacted with once deactivated.

### Parameters

#### options

##### auth_ids

[`MaybeAuthId`](../types/type-aliases/MaybeAuthId.md)[]

ObjectIds corresponding to tokens in the well-known "auth" MongoDb
collection.

### Returns

`Promise`\<`number`\>

## Call Signature

> **deleteTokens**(`options`): `Promise`\<`number`\>

Defined in: [packages/api-strategy/src/auth.ts:369](https://github.com/Xunnamius/api-utils/blob/ee7740d17f3fcf19933c048d9a79c5c0520267a8/packages/api-strategy/src/auth.ts#L369)

Deletes entries matching the given `filter` in the well-known "auth" MongoDB
collection.

Throws on invalid input.

Deleted entries remain in the system but in a deactivated state. They cannot
be reactivated or otherwise interacted with once deactivated.

### Parameters

#### options

##### filter

`LiteralUnknownUnion`\<`Partial`\<\{ `isGlobalAdmin`: `boolean`; `owner`: `string` \| `string`[]; \}\>\>

Only those tokens that satisfy [TokenAttributesFilter](../types/type-aliases/TokenAttributesFilter.md) are deleted.

### Returns

`Promise`\<`number`\>
