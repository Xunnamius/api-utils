[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / TokenAttributes

# Type Alias: TokenAttributes

> **TokenAttributes** = `object`

Defined in: [packages/api-strategy/src/auth/types.ts:112](https://github.com/Xunnamius/api-utils/blob/60a2178cffe0885ecc2a390e9b6bc795373b5e0b/packages/api-strategy/src/auth/types.ts#L112)

The shape of the attributes corresponding to a full token entry in the
well-known "auth" collection. Each property must correspond to an array
element in the validTokenAttributes array and vice-versa.

## Properties

### isGlobalAdmin?

> `optional` **isGlobalAdmin**: `boolean`

Defined in: [packages/api-strategy/src/auth/types.ts:122](https://github.com/Xunnamius/api-utils/blob/60a2178cffe0885ecc2a390e9b6bc795373b5e0b/packages/api-strategy/src/auth/types.ts#L122)

If `true`, the token grants access to potentially dangerous abilities.

#### Default

```ts
undefined
```

***

### owner

> **owner**: `string`

Defined in: [packages/api-strategy/src/auth/types.ts:116](https://github.com/Xunnamius/api-utils/blob/60a2178cffe0885ecc2a390e9b6bc795373b5e0b/packages/api-strategy/src/auth/types.ts#L116)

A string (or stringified `ObjectId`) representing the owner of the token.
