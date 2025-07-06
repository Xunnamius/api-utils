[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyMiddlewareContext

# Type Alias: LegacyMiddlewareContext\<Options, Heap\>

> **LegacyMiddlewareContext**\<`Options`, `Heap`\> = [`MiddlewareContext`](MiddlewareContext.md)\<`Options`, `Heap`, [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `Heap`\>\>

Defined in: [packages/api/src/types.ts:341](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/types.ts#L341)

Meant for use when typing middleware function parameters.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## See

[MiddlewareContext](MiddlewareContext.md)
