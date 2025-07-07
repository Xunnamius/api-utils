[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / getTokens

# Function: getTokens()

## Call Signature

> **getTokens**(`options`): `Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)[]\>

Defined in: [packages/api-strategy/src/auth.ts:204](https://github.com/Xunnamius/api-utils/blob/9ad17e4ad2e689dd2955c28701b11d077ae09346/packages/api-strategy/src/auth.ts#L204)

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

Defined in: [packages/api-strategy/src/auth.ts:217](https://github.com/Xunnamius/api-utils/blob/9ad17e4ad2e689dd2955c28701b11d077ae09346/packages/api-strategy/src/auth.ts#L217)

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
