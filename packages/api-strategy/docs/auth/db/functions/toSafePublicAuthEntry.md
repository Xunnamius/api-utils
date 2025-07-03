[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/db](../README.md) / toSafePublicAuthEntry

# Function: toSafePublicAuthEntry()

> **toSafePublicAuthEntry**(`entry`): [`SafePublicAuthEntry`](../../types/type-aliases/SafePublicAuthEntry.md)

Defined in: [packages/api-strategy/src/auth/db.ts:60](https://github.com/Xunnamius/api-utils/blob/4b9cf49c1b8ec6d8960c6a16e9e497be226b121a/packages/api-strategy/src/auth/db.ts#L60)

Transform an internal entry from the well-known "auth" MongoDB collection
into one that is safe for consumption by non-privileged units.

## Parameters

### entry

[`InternalAuthEntry`](../../types/type-aliases/InternalAuthEntry.md)

## Returns

[`SafePublicAuthEntry`](../../types/type-aliases/SafePublicAuthEntry.md)
