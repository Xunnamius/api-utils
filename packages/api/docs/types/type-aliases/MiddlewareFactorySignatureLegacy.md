[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureLegacy

# Type Alias: MiddlewareFactorySignatureLegacy()\<Options, Heap\>

> **MiddlewareFactorySignatureLegacy**\<`Options`, `Heap`\> = (`handler`, `options`) => [`LegacyApiHandler`](LegacyApiHandler.md)

Defined in: [packages/api/src/types.ts:442](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/types.ts#L442)

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
