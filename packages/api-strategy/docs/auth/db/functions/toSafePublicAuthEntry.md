[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/db](../README.md) / toSafePublicAuthEntry

# Function: toSafePublicAuthEntry()

> **toSafePublicAuthEntry**(`entry`): [`SafePublicAuthEntry`](../../types/type-aliases/SafePublicAuthEntry.md)

Defined in: [packages/api-strategy/src/auth/db.ts:60](https://github.com/Xunnamius/api-utils/blob/b785d9e67ba769b2480f64a9690c2911fb596cf7/packages/api-strategy/src/auth/db.ts#L60)

Transform an internal entry from the well-known "auth" MongoDB collection
into one that is safe for consumption by non-privileged units.

## Parameters

### entry

[`InternalAuthEntry`](../../types/type-aliases/InternalAuthEntry.md)

## Returns

[`SafePublicAuthEntry`](../../types/type-aliases/SafePublicAuthEntry.md)
