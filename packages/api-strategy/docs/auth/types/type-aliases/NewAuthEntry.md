[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / NewAuthEntry

# Type Alias: NewAuthEntry

> **NewAuthEntry** = `object`

Defined in: [auth/types.ts:71](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/auth/types.ts#L71)

The shape of a new entry in the well-known "auth" collection.

## Properties

### attributes

> **attributes**: [`TokenAttributes`](TokenAttributes.md)

Defined in: [auth/types.ts:78](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/auth/types.ts#L78)

Metadata attributes associated with this new "auth" entry.

**WARNING: Token attributes should NEVER contain sensitive or confidential
information!**
