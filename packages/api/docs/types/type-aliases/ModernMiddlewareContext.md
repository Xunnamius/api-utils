[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernMiddlewareContext

# Type Alias: ModernMiddlewareContext\<Options, Heap\>

> **ModernMiddlewareContext**\<`Options`, `Heap`\> = [`MiddlewareContext`](MiddlewareContext.md)\<`Options`, `Heap`, [`ModernMiddleware`](ModernMiddleware.md)\<`Options`, `Heap`\>\>

Defined in: [packages/api/src/types.ts:337](https://github.com/Xunnamius/api-utils/blob/20b3c0a8fb0d738da534e0b5a18ecc7bfb431124/packages/api/src/types.ts#L337)

Meant for use when typing middleware function parameters.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## See

[MiddlewareContext](MiddlewareContext.md)
