[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernOrLegacyMiddleware

# Type Alias: ModernOrLegacyMiddleware\<Options, Heap\>

> **ModernOrLegacyMiddleware**\<`Options`, `Heap`\> = [`ModernMiddleware`](ModernMiddleware.md)\<`Options`, `Heap`\> \| [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `Heap`\>

Defined in: [packages/api/src/types.ts:115](https://github.com/Xunnamius/api-utils/blob/183a3e5b3fec7a1bf06d5be3da477b72510b5586/packages/api/src/types.ts#L115)

The union of [ModernMiddleware](ModernMiddleware.md) and [LegacyMiddleware](LegacyMiddleware.md).

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
