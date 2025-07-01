[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / PublicAuthEntry

# Type Alias: PublicAuthEntry

> **PublicAuthEntry** = `Pick`\<[`InternalAuthEntry`](InternalAuthEntry.md), `"attributes"` \| `"token"`\> & `object`

Defined in: [auth/types.ts:152](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/auth/types.ts#L152)

The public base shape derived from an entry in the well-known "auth"
collection.

## Type declaration

### auth\_id

> **auth\_id**: `string`

A string representation of the ObjectId associated with this entry.
