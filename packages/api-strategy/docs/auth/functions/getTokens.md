[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / getTokens

# Function: getTokens()

## Call Signature

> **getTokens**(`options`): `Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)[]\>

Defined in: [auth.ts:177](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/auth.ts#L177)

Returns entries corresponding to the given `_id`s (`auth_ids`) in the
well-known "auth" MongoDB collection.

Throws on invalid input.

### Parameters

#### options

##### auth_ids

[`MaybeAuthId`](../types/type-aliases/MaybeAuthId.md)[]

ObjectIds corresponding to tokens in the well-known "auth" MongoDb
collection.

### Returns

`Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)[]\>

## Call Signature

> **getTokens**(`options`): `Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)[]\>

Defined in: [auth.ts:190](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/auth.ts#L190)

Returns entries matching the given `filter` in the well-known "auth" MongoDB
collection.

Throws on invalid input.

### Parameters

#### options

##### filter

`LiteralUnknownUnion`\<`Partial`\<\{ `isGlobalAdmin`: `boolean`; `owner`: `string` \| `string`[]; \}\>\>

Only those tokens that satisfy [TokenAttributesFilter](../types/type-aliases/TokenAttributesFilter.md) are returned.

### Returns

`Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)[]\>
