[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/db](../README.md) / toPublicAuthEntry

# Function: toPublicAuthEntry()

> **toPublicAuthEntry**(`entry`): [`PublicAuthEntry`](../../types/type-aliases/PublicAuthEntry.md)

Defined in: [packages/api-strategy/src/auth/db.ts:46](https://github.com/Xunnamius/api-utils/blob/3905fc4975c9f15e022202427b124cf715fcf3dc/packages/api-strategy/src/auth/db.ts#L46)

Transform an internal entry from the well-known "auth" MongoDB collection
into one that is safe for consumption by privileged units.

## Parameters

### entry

[`InternalAuthEntry`](../../types/type-aliases/InternalAuthEntry.md)

## Returns

[`PublicAuthEntry`](../../types/type-aliases/PublicAuthEntry.md)
