[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / NewAuthEntry

# Type Alias: NewAuthEntry

> **NewAuthEntry** = `object`

Defined in: [packages/api-strategy/src/auth/types.ts:67](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/auth/types.ts#L67)

The shape of a new entry in the well-known "auth" collection.

## Properties

### attributes

> **attributes**: [`TokenAttributes`](TokenAttributes.md)

Defined in: [packages/api-strategy/src/auth/types.ts:74](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/auth/types.ts#L74)

Metadata attributes associated with this new "auth" entry.

**WARNING: Token attributes should NEVER contain sensitive or confidential
information!**
