[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureModern

# Type Alias: MiddlewareFactorySignatureModern()\<Options, RequestType, ResponseType, Heap\>

> **MiddlewareFactorySignatureModern**\<`Options`, `RequestType`, `ResponseType`, `Heap`\> = (`handler`, `options`) => [`ModernBasicApiHandler`](ModernBasicApiHandler.md)\<`RequestType`, `ResponseType`\>

Defined in: [packages/api/src/types.ts:436](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L436)

middlewareFactory

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### RequestType

`RequestType` *extends* `Request`

### ResponseType

`ResponseType` *extends* `Response`

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### handler

[`ModernApiHandler`](ModernApiHandler.md)\<`RequestType`, `ResponseType`, `Heap`\> | `undefined`

### options

[`FactoriedMiddlewareOptions`](FactoriedMiddlewareOptions.md)\<`Options`, `Heap`, [`ModernMiddleware`](ModernMiddleware.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>\>

## Returns

[`ModernBasicApiHandler`](ModernBasicApiHandler.md)\<`RequestType`, `ResponseType`\>
