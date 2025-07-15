[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernMiddlewareContext

# Type Alias: ModernMiddlewareContext\<Options, Heap\>

> **ModernMiddlewareContext**\<`Options`, `Heap`\> = [`MiddlewareContext`](MiddlewareContext.md)\<`Options`, `Heap`, [`ModernMiddleware`](ModernMiddleware.md)\<`Options`, `Heap`\>\>

Defined in: [packages/api/src/types.ts:337](https://github.com/Xunnamius/api-utils/blob/e344f26c2c71ff2ab26a4bf6ee6f0fc1cb9a441b/packages/api/src/types.ts#L337)

Meant for use when typing middleware function parameters.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## See

[MiddlewareContext](MiddlewareContext.md)
