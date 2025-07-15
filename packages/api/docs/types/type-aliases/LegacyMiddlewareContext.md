[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyMiddlewareContext

# Type Alias: LegacyMiddlewareContext\<Options, Heap\>

> **LegacyMiddlewareContext**\<`Options`, `Heap`\> = [`MiddlewareContext`](MiddlewareContext.md)\<`Options`, `Heap`, [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `Heap`\>\>

Defined in: [packages/api/src/types.ts:347](https://github.com/Xunnamius/api-utils/blob/3e7489507eea9aa3d33b0bcc648e0389bef6f3f5/packages/api/src/types.ts#L347)

Meant for use when typing middleware function parameters.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## See

[MiddlewareContext](MiddlewareContext.md)
