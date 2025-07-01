[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / deleteTokens

# Function: deleteTokens()

## Call Signature

> **deleteTokens**(`options`): `Promise`\<`number`\>

Defined in: [auth.ts:315](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/auth.ts#L315)

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

Defined in: [auth.ts:331](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/auth.ts#L331)

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
