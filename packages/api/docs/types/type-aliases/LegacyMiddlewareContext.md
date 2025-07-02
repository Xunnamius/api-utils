[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyMiddlewareContext

# Type Alias: LegacyMiddlewareContext\<Options, Heap, RequestType, ResponseType\>

> **LegacyMiddlewareContext**\<`Options`, `Heap`, `RequestType`, `ResponseType`\> = [`MiddlewareContext`](MiddlewareContext.md)\<`Options`, `Heap`, [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>\>

Defined in: [packages/api/src/types.ts:318](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L318)

Meant for use when typing middleware function parameters.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

### RequestType

`RequestType` *extends* [`NextApiRequestLike`](../../index/interfaces/NextApiRequestLike.md) = [`NextApiRequestLike`](../../index/interfaces/NextApiRequestLike.md)

### ResponseType

`ResponseType` *extends* [`NextApiResponseLike`](../../index/type-aliases/NextApiResponseLike.md) = [`NextApiResponseLike`](../../index/type-aliases/NextApiResponseLike.md)

## See

[MiddlewareContext](MiddlewareContext.md)
