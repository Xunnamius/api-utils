[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / PublicAuthEntry

# Type Alias: PublicAuthEntry

> **PublicAuthEntry** = `Pick`\<[`InternalAuthEntry`](InternalAuthEntry.md), `"attributes"` \| `"token"`\> & `object`

Defined in: [packages/api-strategy/src/auth/types.ts:148](https://github.com/Xunnamius/api-utils/blob/52a8c73e7bc88df6639a2fe1c2313f726aa468a9/packages/api-strategy/src/auth/types.ts#L148)

The public base shape derived from an entry in the well-known "auth"
collection.

## Type declaration

### auth\_id

> **auth\_id**: `string`

A string representation of the ObjectId associated with this entry.
