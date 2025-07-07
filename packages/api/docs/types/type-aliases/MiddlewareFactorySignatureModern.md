[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureModern

# Type Alias: MiddlewareFactorySignatureModern()\<Options, Heap\>

> **MiddlewareFactorySignatureModern**\<`Options`, `Heap`\> = (`handler`, `options`) => [`ModernApiHandler`](ModernApiHandler.md)

Defined in: [packages/api/src/types.ts:437](https://github.com/Xunnamius/api-utils/blob/5da7e0f39c76927221d59796ee606e41a5525952/packages/api/src/types.ts#L437)

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
