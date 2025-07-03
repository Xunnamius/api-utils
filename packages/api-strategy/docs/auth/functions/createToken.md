[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / createToken

# Function: createToken()

> **createToken**(`__namedParameters`): `Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)\>

Defined in: [packages/api-strategy/src/auth.ts:144](https://github.com/Xunnamius/api-utils/blob/c4e96008fb8e0dd5fdfbead84f2e3657f2f0352f/packages/api-strategy/src/auth.ts#L144)

Generates a new bearer token and auth entry in the well-known "auth" MongoDB
collection.

Throws on invalid input.

## Parameters

### \_\_namedParameters

#### data

`LiteralUnknownUnion`\<[`NewAuthEntry`](../types/type-aliases/NewAuthEntry.md)\>

Data used to generate a new "auth" entry in the well-known "auth" MongoDB
collection

## Returns

`Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)\>
