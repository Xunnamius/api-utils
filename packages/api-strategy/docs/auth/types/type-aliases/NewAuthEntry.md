[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / NewAuthEntry

# Type Alias: NewAuthEntry

> **NewAuthEntry** = `object`

Defined in: [packages/api-strategy/src/auth/types.ts:67](https://github.com/Xunnamius/api-utils/blob/3905fc4975c9f15e022202427b124cf715fcf3dc/packages/api-strategy/src/auth/types.ts#L67)

The shape of a new entry in the well-known "auth" collection.

## Properties

### attributes

> **attributes**: [`TokenAttributes`](TokenAttributes.md)

Defined in: [packages/api-strategy/src/auth/types.ts:74](https://github.com/Xunnamius/api-utils/blob/3905fc4975c9f15e022202427b124cf715fcf3dc/packages/api-strategy/src/auth/types.ts#L74)

Metadata attributes associated with this new "auth" entry.

**WARNING: Token attributes should NEVER contain sensitive or confidential
information!**
