[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / PublicAuthEntry

# Type Alias: PublicAuthEntry

> **PublicAuthEntry** = `Pick`\<[`InternalAuthEntry`](InternalAuthEntry.md), `"attributes"` \| `"token"`\> & `object`

Defined in: [packages/api-strategy/src/auth/types.ts:152](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api-strategy/src/auth/types.ts#L152)

The public base shape derived from an entry in the well-known "auth"
collection.

## Type declaration

### auth\_id

> **auth\_id**: `string`

A string representation of the ObjectId associated with this entry.
