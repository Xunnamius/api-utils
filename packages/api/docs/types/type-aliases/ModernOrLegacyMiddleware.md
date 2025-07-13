[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernOrLegacyMiddleware

# Type Alias: ModernOrLegacyMiddleware\<Options, Heap\>

> **ModernOrLegacyMiddleware**\<`Options`, `Heap`\> = [`ModernMiddleware`](ModernMiddleware.md)\<`Options`, `Heap`\> \| [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `Heap`\>

Defined in: [packages/api/src/types.ts:115](https://github.com/Xunnamius/api-utils/blob/559770a60e6903bf2f195d0d5f6450a09f08cf05/packages/api/src/types.ts#L115)

The union of [ModernMiddleware](ModernMiddleware.md) and [LegacyMiddleware](LegacyMiddleware.md).

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
