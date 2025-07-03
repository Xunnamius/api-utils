[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / TokenAttributes

# Type Alias: TokenAttributes

> **TokenAttributes** = `object`

Defined in: [packages/api-strategy/src/auth/types.ts:116](https://github.com/Xunnamius/api-utils/blob/4b9cf49c1b8ec6d8960c6a16e9e497be226b121a/packages/api-strategy/src/auth/types.ts#L116)

The shape of the attributes corresponding to a full token entry in the
well-known "auth" collection. Each property must correspond to an array
element in the validTokenAttributes array and vice-versa.

## Properties

### isGlobalAdmin?

> `optional` **isGlobalAdmin**: `boolean`

Defined in: [packages/api-strategy/src/auth/types.ts:126](https://github.com/Xunnamius/api-utils/blob/4b9cf49c1b8ec6d8960c6a16e9e497be226b121a/packages/api-strategy/src/auth/types.ts#L126)

If `true`, the token grants access to potentially dangerous abilities.

#### Default

```ts
undefined
```

***

### owner

> **owner**: `string`

Defined in: [packages/api-strategy/src/auth/types.ts:120](https://github.com/Xunnamius/api-utils/blob/4b9cf49c1b8ec6d8960c6a16e9e497be226b121a/packages/api-strategy/src/auth/types.ts#L120)

A string (or stringified `ObjectId`) representing the owner of the token.
