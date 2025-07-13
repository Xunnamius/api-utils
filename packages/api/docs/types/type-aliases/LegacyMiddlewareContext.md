[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyMiddlewareContext

# Type Alias: LegacyMiddlewareContext\<Options, Heap\>

> **LegacyMiddlewareContext**\<`Options`, `Heap`\> = [`MiddlewareContext`](MiddlewareContext.md)\<`Options`, `Heap`, [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `Heap`\>\>

Defined in: [packages/api/src/types.ts:347](https://github.com/Xunnamius/api-utils/blob/38288e756f37a9fa3bac377fdbaa51608d8bbed9/packages/api/src/types.ts#L347)

Meant for use when typing middleware function parameters.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## See

[MiddlewareContext](MiddlewareContext.md)
