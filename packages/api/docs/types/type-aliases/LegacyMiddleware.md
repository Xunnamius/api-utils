[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyMiddleware

# Type Alias: LegacyMiddleware\<Options, Heap\>

> **LegacyMiddleware**\<`Options`, `Heap`\> = [`WithLegacyTag`](WithLegacyTag.md)\<(`req`, `res`, `middlewareContext`) => `Promisable`\<`unknown`\>\>

Defined in: [packages/api/src/types.ts:95](https://github.com/Xunnamius/api-utils/blob/38288e756f37a9fa3bac377fdbaa51608d8bbed9/packages/api/src/types.ts#L95)

The shape of a legacy middleware function.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
