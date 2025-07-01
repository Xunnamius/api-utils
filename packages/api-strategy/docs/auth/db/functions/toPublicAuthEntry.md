[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/db](../README.md) / toPublicAuthEntry

# Function: toPublicAuthEntry()

> **toPublicAuthEntry**(`entry`): [`PublicAuthEntry`](../../types/type-aliases/PublicAuthEntry.md)

Defined in: [auth/db.ts:46](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/auth/db.ts#L46)

Transform an internal entry from the well-known "auth" MongoDB collection
into one that is safe for consumption by privileged units.

## Parameters

### entry

[`InternalAuthEntry`](../../types/type-aliases/InternalAuthEntry.md)

## Returns

[`PublicAuthEntry`](../../types/type-aliases/PublicAuthEntry.md)
