[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/db](../README.md) / toSafePublicAuthEntry

# Function: toSafePublicAuthEntry()

> **toSafePublicAuthEntry**(`entry`): [`SafePublicAuthEntry`](../../types/type-aliases/SafePublicAuthEntry.md)

Defined in: [packages/api-strategy/src/auth/db.ts:60](https://github.com/Xunnamius/api-utils/blob/52a8c73e7bc88df6639a2fe1c2313f726aa468a9/packages/api-strategy/src/auth/db.ts#L60)

Transform an internal entry from the well-known "auth" MongoDB collection
into one that is safe for consumption by non-privileged units.

## Parameters

### entry

[`InternalAuthEntry`](../../types/type-aliases/InternalAuthEntry.md)

## Returns

[`SafePublicAuthEntry`](../../types/type-aliases/SafePublicAuthEntry.md)
