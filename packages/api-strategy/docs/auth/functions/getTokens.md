[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / getTokens

# Function: getTokens()

## Call Signature

> **getTokens**(`options`): `Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)[]\>

Defined in: [packages/api-strategy/src/auth.ts:181](https://github.com/Xunnamius/api-utils/blob/c4e96008fb8e0dd5fdfbead84f2e3657f2f0352f/packages/api-strategy/src/auth.ts#L181)

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

Defined in: [packages/api-strategy/src/auth.ts:194](https://github.com/Xunnamius/api-utils/blob/c4e96008fb8e0dd5fdfbead84f2e3657f2f0352f/packages/api-strategy/src/auth.ts#L194)

Returns entries matching the given `filter` in the well-known "auth" MongoDB
collection.

Throws on invalid input.

### Parameters

#### options

##### after_id?

[`MaybeAuthId`](../types/type-aliases/MaybeAuthId.md)

Only return tokens with ids that occur "after" (i.e. are less than)
`after_id`.

##### filter

`LiteralUnknownUnion`\<`Partial`\<\{ `isGlobalAdmin`: `boolean`; `owner`: `string` \| `string`[]; \}\>\>

Only those tokens that satisfy [TokenAttributesFilter](../types/type-aliases/TokenAttributesFilter.md) are returned.

### Returns

`Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)[]\>
