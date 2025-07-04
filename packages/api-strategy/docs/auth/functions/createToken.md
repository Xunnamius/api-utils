[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / createToken

# Function: createToken()

## Call Signature

> **createToken**(`options`): `Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)\>

Defined in: [packages/api-strategy/src/auth.ts:161](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/auth.ts#L161)

Generates a new bearer token and auth entry in the well-known "auth" MongoDB
collection.

Throws on invalid input.

### Parameters

#### options

`CreateTokenOptions` & `object`

### Returns

`Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)\>

## Call Signature

> **createToken**(`options`): `Promise`\<[`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>

Defined in: [packages/api-strategy/src/auth.ts:164](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/auth.ts#L164)

Generates a new bearer token and auth entry in the well-known "auth" MongoDB
collection.

Throws on invalid input.

### Parameters

#### options

`CreateTokenOptions` & `object`

### Returns

`Promise`\<[`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>

## Call Signature

> **createToken**(`options`): `Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md) \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>

Defined in: [packages/api-strategy/src/auth.ts:167](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/auth.ts#L167)

Generates a new bearer token and auth entry in the well-known "auth" MongoDB
collection.

Throws on invalid input.

### Parameters

#### options

`CreateTokenOptions`

### Returns

`Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md) \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>
