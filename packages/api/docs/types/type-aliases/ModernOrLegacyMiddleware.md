[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernOrLegacyMiddleware

# Type Alias: ModernOrLegacyMiddleware\<Options, Heap\>

> **ModernOrLegacyMiddleware**\<`Options`, `Heap`\> = [`ModernMiddleware`](ModernMiddleware.md)\<`Options`, `Heap`\> \| [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `Heap`\>

Defined in: [packages/api/src/types.ts:111](https://github.com/Xunnamius/api-utils/blob/f86b6da3746432264ea1e1b00e1751b0fe171fe2/packages/api/src/types.ts#L111)

The union of [ModernMiddleware](ModernMiddleware.md) and [LegacyMiddleware](LegacyMiddleware.md).

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
