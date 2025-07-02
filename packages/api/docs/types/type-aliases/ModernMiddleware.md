[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernMiddleware

# Type Alias: ModernMiddleware\<Options, RequestType, ResponseType, Heap\>

> **ModernMiddleware**\<`Options`, `RequestType`, `ResponseType`, `Heap`\> = [`WithModernTag`](WithModernTag.md)\<(`request`, `context`) => `Promisable`\<`ResponseType` \| `undefined` \| `void`\>\>

Defined in: [packages/api/src/types.ts:56](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L56)

The shape of a modern middleware function.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### RequestType

`RequestType` *extends* `Request`

### ResponseType

`ResponseType` *extends* `Response`

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
