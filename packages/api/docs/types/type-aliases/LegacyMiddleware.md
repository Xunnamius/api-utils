[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyMiddleware

# Type Alias: LegacyMiddleware\<Options, Heap\>

> **LegacyMiddleware**\<`Options`, `Heap`\> = [`WithLegacyTag`](WithLegacyTag.md)\<(`req`, `res`, `middlewareContext`) => `Promisable`\<`unknown`\>\>

Defined in: [packages/api/src/types.ts:80](https://github.com/Xunnamius/api-utils/blob/1f0c4ddbfee87314a3a69fe0605abddd045878f2/packages/api/src/types.ts#L80)

The shape of a legacy middleware function.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
