[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureLegacy

# Type Alias: MiddlewareFactorySignatureLegacy()\<Options, Heap\>

> **MiddlewareFactorySignatureLegacy**\<`Options`, `Heap`\> = (`handler`, `options`) => [`LegacyApiHandler`](LegacyApiHandler.md)

Defined in: [packages/api/src/types.ts:448](https://github.com/Xunnamius/api-utils/blob/f159b4026fbac8d4de769d2a9e8cfaddf85d9e96/packages/api/src/types.ts#L448)

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
