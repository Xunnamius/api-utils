[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyMiddleware

# Type Alias: LegacyMiddleware\<Options, Heap\>

> **LegacyMiddleware**\<`Options`, `Heap`\> = [`WithLegacyTag`](WithLegacyTag.md)\<(`req`, `res`, `middlewareContext`) => `Promisable`\<`unknown`\>\>

Defined in: [packages/api/src/types.ts:95](https://github.com/Xunnamius/api-utils/blob/183a3e5b3fec7a1bf06d5be3da477b72510b5586/packages/api/src/types.ts#L95)

The shape of a legacy middleware function.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
