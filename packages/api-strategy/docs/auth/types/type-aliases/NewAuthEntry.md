[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / NewAuthEntry

# Type Alias: NewAuthEntry

> **NewAuthEntry** = `object`

Defined in: [packages/api-strategy/src/auth/types.ts:71](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api-strategy/src/auth/types.ts#L71)

The shape of a new entry in the well-known "auth" collection.

## Properties

### attributes

> **attributes**: [`TokenAttributes`](TokenAttributes.md)

Defined in: [packages/api-strategy/src/auth/types.ts:78](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api-strategy/src/auth/types.ts#L78)

Metadata attributes associated with this new "auth" entry.

**WARNING: Token attributes should NEVER contain sensitive or confidential
information!**
