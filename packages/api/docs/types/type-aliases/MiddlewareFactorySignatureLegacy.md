[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureLegacy

# Type Alias: MiddlewareFactorySignatureLegacy()\<Options, RequestType, ResponseType, Heap\>

> **MiddlewareFactorySignatureLegacy**\<`Options`, `RequestType`, `ResponseType`, `Heap`\> = (`handler`, `options`) => [`LegacyBasicApiHandler`](LegacyBasicApiHandler.md)\<`RequestType`, `ResponseType`\>

Defined in: [packages/api/src/types.ts:453](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L453)

middlewareFactory

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

[`FactoriedMiddlewareOptions`](FactoriedMiddlewareOptions.md)\<`Options`, `Heap`, [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>\>

## Returns

[`LegacyBasicApiHandler`](LegacyBasicApiHandler.md)\<`RequestType`, `ResponseType`\>
