[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureLegacy

# Type Alias: MiddlewareFactorySignatureLegacy()\<Options, Heap\>

> **MiddlewareFactorySignatureLegacy**\<`Options`, `Heap`\> = (`handler`, `options`) => [`LegacyApiHandler`](LegacyApiHandler.md)

Defined in: [packages/api/src/types.ts:445](https://github.com/Xunnamius/api-utils/blob/60863c4db4ba817b2926c481da6a42f07a7c9992/packages/api/src/types.ts#L445)

middlewareFactory

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### handler

[`LegacyApiHandlerWithHeap`](LegacyApiHandlerWithHeap.md)\<`Heap`\> | `undefined`

### options

[`FactoriedMiddlewareOptions`](FactoriedMiddlewareOptions.md)\<`Options`, `Heap`, [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `Heap`\>\>

## Returns

[`LegacyApiHandler`](LegacyApiHandler.md)
