[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / updateTokensAttributes

# Function: updateTokensAttributes()

## Call Signature

> **updateTokensAttributes**(`options`): `Promise`\<`number`\>

Defined in: [packages/api-strategy/src/auth.ts:279](https://github.com/Xunnamius/api-utils/blob/80abd4a35bc71883d21e2018ef2b5a215a9a56b3/packages/api-strategy/src/auth.ts#L279)

Updates entries corresponding to the given `_id`s (`auth_ids`) in the
well-known "auth" MongoDB collection.

Throws on invalid input.

**WARNING: `update` is used to _patch_, not replace, the existing attributes
objects.**

### Parameters

#### options

##### auth_ids

[`MaybeAuthId`](../types/type-aliases/MaybeAuthId.md)[]

ObjectIds corresponding to tokens in the well-known "auth" MongoDb
collection.

##### data

`LiteralUnknownUnion`\<[`TokenAttributes`](../types/type-aliases/TokenAttributes.md)\>

Data used to patch the auth entry's attributes.

### Returns

`Promise`\<`number`\>

## Call Signature

> **updateTokensAttributes**(`options`): `Promise`\<`number`\>

Defined in: [packages/api-strategy/src/auth.ts:299](https://github.com/Xunnamius/api-utils/blob/80abd4a35bc71883d21e2018ef2b5a215a9a56b3/packages/api-strategy/src/auth.ts#L299)

Updates entries matching the given `filter` in the well-known "auth" MongoDB
collection.

Throws on invalid input.

**WARNING: `update` is used to _patch_, not replace, the existing attributes
objects.**

### Parameters

#### options

##### data

`LiteralUnknownUnion`\<[`TokenAttributes`](../types/type-aliases/TokenAttributes.md)\>

Data used to patch the auth entry's attributes.

##### filter

`LiteralUnknownUnion`\<`Partial`\<\{ `isGlobalAdmin`: `boolean`; `owner`: `string` \| `string`[]; \}\>\>

Only those tokens that satisfy [TokenAttributesFilter](../types/type-aliases/TokenAttributesFilter.md) are updated.

### Returns

`Promise`\<`number`\>
