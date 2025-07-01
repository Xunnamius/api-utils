[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / createToken

# Function: createToken()

> **createToken**(`__namedParameters`): `Promise`\<[`PublicAuthEntry`](../types/type-aliases/PublicAuthEntry.md)\>

Defined in: [auth.ts:140](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/auth.ts#L140)

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
