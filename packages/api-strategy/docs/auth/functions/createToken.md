[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / createToken

# Function: createToken()

> **createToken**(`__namedParameters`): `Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)\>

Defined in: [auth.ts:140](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/auth.ts#L140)

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
