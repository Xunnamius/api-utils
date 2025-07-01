[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / NewAuthEntry

# Type Alias: NewAuthEntry

> **NewAuthEntry** = `object`

Defined in: [auth/types.ts:71](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/auth/types.ts#L71)

The shape of a new entry in the well-known "auth" collection.

## Properties

### attributes

> **attributes**: [`TokenAttributes`](TokenAttributes.md)

Defined in: [auth/types.ts:78](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/auth/types.ts#L78)

Metadata attributes associated with this new "auth" entry.

**WARNING: Token attributes should NEVER contain sensitive or confidential
information!**
