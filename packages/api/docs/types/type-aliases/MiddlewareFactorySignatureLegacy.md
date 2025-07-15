[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureLegacy

# Type Alias: MiddlewareFactorySignatureLegacy()\<Options, Heap\>

> **MiddlewareFactorySignatureLegacy**\<`Options`, `Heap`\> = (`handler`, `options`) => [`LegacyApiHandler`](LegacyApiHandler.md)

Defined in: [packages/api/src/types.ts:445](https://github.com/Xunnamius/api-utils/blob/3e7489507eea9aa3d33b0bcc648e0389bef6f3f5/packages/api/src/types.ts#L445)

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
