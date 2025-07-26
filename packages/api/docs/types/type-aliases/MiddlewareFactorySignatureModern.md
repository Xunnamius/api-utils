[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureModern

# Type Alias: MiddlewareFactorySignatureModern()\<Options, Heap\>

> **MiddlewareFactorySignatureModern**\<`Options`, `Heap`\> = (`handler`, `options`) => [`ModernApiHandler`](ModernApiHandler.md)

Defined in: [packages/api/src/types.ts:434](https://github.com/Xunnamius/api-utils/blob/183a3e5b3fec7a1bf06d5be3da477b72510b5586/packages/api/src/types.ts#L434)

middlewareFactory

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### handler

[`ModernApiHandlerWithHeap`](ModernApiHandlerWithHeap.md)\<`Heap`\> | `undefined`

### options

[`FactoriedMiddlewareOptions`](FactoriedMiddlewareOptions.md)\<`Options`, `Heap`, [`ModernMiddleware`](ModernMiddleware.md)\<`Options`, `Heap`\>\>

## Returns

[`ModernApiHandler`](ModernApiHandler.md)
