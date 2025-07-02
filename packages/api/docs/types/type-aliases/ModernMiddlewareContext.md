[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernMiddlewareContext

# Type Alias: ModernMiddlewareContext\<Options, Heap, RequestType, ResponseType\>

> **ModernMiddlewareContext**\<`Options`, `Heap`, `RequestType`, `ResponseType`\> = [`MiddlewareContext`](MiddlewareContext.md)\<`Options`, `Heap`, [`ModernMiddleware`](ModernMiddleware.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>\>

Defined in: [packages/api/src/types.ts:302](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L302)

Meant for use when typing middleware function parameters.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

### RequestType

`RequestType` *extends* `Request` = `Request`

### ResponseType

`ResponseType` *extends* `Response` = `Response`

## See

[MiddlewareContext](MiddlewareContext.md)
