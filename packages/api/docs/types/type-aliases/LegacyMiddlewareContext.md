[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyMiddlewareContext

# Type Alias: LegacyMiddlewareContext\<Options, Heap\>

> **LegacyMiddlewareContext**\<`Options`, `Heap`\> = [`MiddlewareContext`](MiddlewareContext.md)\<`Options`, `Heap`, [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `Heap`\>\>

Defined in: [packages/api/src/types.ts:274](https://github.com/Xunnamius/api-utils/blob/1f0c4ddbfee87314a3a69fe0605abddd045878f2/packages/api/src/types.ts#L274)

Meant for use when typing middleware function parameters.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## See

[MiddlewareContext](MiddlewareContext.md)
