[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureModern

# Type Alias: MiddlewareFactorySignatureModern()\<Options, Heap\>

> **MiddlewareFactorySignatureModern**\<`Options`, `Heap`\> = (`handler`, `options`) => [`ModernApiHandler`](ModernApiHandler.md)

Defined in: [packages/api/src/types.ts:434](https://github.com/Xunnamius/api-utils/blob/559770a60e6903bf2f195d0d5f6450a09f08cf05/packages/api/src/types.ts#L434)

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
