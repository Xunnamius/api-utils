[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / deleteTokens

# Function: deleteTokens()

## Call Signature

> **deleteTokens**(`options`): `Promise`\<`number`\>

Defined in: [packages/api-strategy/src/auth.ts:330](https://github.com/Xunnamius/api-utils/blob/c4e96008fb8e0dd5fdfbead84f2e3657f2f0352f/packages/api-strategy/src/auth.ts#L330)

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

Defined in: [packages/api-strategy/src/auth.ts:346](https://github.com/Xunnamius/api-utils/blob/c4e96008fb8e0dd5fdfbead84f2e3657f2f0352f/packages/api-strategy/src/auth.ts#L346)

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
