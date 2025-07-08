[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / deleteTokens

# Function: deleteTokens()

## Call Signature

> **deleteTokens**(`options`): `Promise`\<`number`\>

Defined in: [packages/api-strategy/src/auth.ts:353](https://github.com/Xunnamius/api-utils/blob/b785d9e67ba769b2480f64a9690c2911fb596cf7/packages/api-strategy/src/auth.ts#L353)

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

Defined in: [packages/api-strategy/src/auth.ts:369](https://github.com/Xunnamius/api-utils/blob/b785d9e67ba769b2480f64a9690c2911fb596cf7/packages/api-strategy/src/auth.ts#L369)

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
