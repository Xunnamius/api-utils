[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureModern

# Type Alias: MiddlewareFactorySignatureModern()\<Options, Heap\>

> **MiddlewareFactorySignatureModern**\<`Options`, `Heap`\> = (`handler`, `options`) => [`ModernApiHandler`](ModernApiHandler.md)

Defined in: [packages/api/src/types.ts:434](https://github.com/Xunnamius/api-utils/blob/3e7489507eea9aa3d33b0bcc648e0389bef6f3f5/packages/api/src/types.ts#L434)

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
