[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / WithMiddlewareSignatureLegacy

# Type Alias: WithMiddlewareSignatureLegacy()\<Options, RequestType, ResponseType, Heap\>

> **WithMiddlewareSignatureLegacy**\<`Options`, `RequestType`, `ResponseType`, `Heap`\> = (`handler`, `options`) => [`LegacyBasicApiHandler`](LegacyBasicApiHandler.md)\<`RequestType`, `ResponseType`\>

Defined in: [packages/api/src/types.ts:393](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L393)

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### RequestType

`RequestType` *extends* [`NextApiRequestLike`](../../index/interfaces/NextApiRequestLike.md)

### ResponseType

`ResponseType` *extends* [`NextApiResponseLike`](../../index/type-aliases/NextApiResponseLike.md)

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### handler

[`LegacyApiHandler`](LegacyApiHandler.md)\<`RequestType`, `ResponseType`, `Heap`\> | `undefined`

### options

[`WithMiddlewareOptions`](WithMiddlewareOptions.md)\<`Options`, `Heap`, [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>\>

## Returns

[`LegacyBasicApiHandler`](LegacyBasicApiHandler.md)\<`RequestType`, `ResponseType`\>

## See

`withMiddleware`
