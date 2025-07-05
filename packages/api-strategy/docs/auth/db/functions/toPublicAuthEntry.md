[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/db](../README.md) / toPublicAuthEntry

# Function: toPublicAuthEntry()

> **toPublicAuthEntry**(`entry`): [`PublicAuthEntry`](../../types/type-aliases/PublicAuthEntry.md)

Defined in: [packages/api-strategy/src/auth/db.ts:46](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/auth/db.ts#L46)

Transform an internal entry from the well-known "auth" MongoDB collection
into one that is safe for consumption by privileged units.

## Parameters

### entry

[`InternalAuthEntry`](../../types/type-aliases/InternalAuthEntry.md)

## Returns

[`PublicAuthEntry`](../../types/type-aliases/PublicAuthEntry.md)
