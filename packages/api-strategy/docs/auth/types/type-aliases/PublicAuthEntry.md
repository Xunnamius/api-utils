[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / PublicAuthEntry

# Type Alias: PublicAuthEntry

> **PublicAuthEntry** = `Pick`\<[`InternalAuthEntry`](InternalAuthEntry.md), `"attributes"` \| `"token"`\> & `object`

Defined in: [packages/api-strategy/src/auth/types.ts:148](https://github.com/Xunnamius/api-utils/blob/840d5baca8526043aadc1db57d1845b3fe2f876c/packages/api-strategy/src/auth/types.ts#L148)

The public base shape derived from an entry in the well-known "auth"
collection.

## Type declaration

### auth\_id

> **auth\_id**: `string`

A string representation of the ObjectId associated with this entry.
