[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernMiddleware

# Type Alias: ModernMiddleware\<Options, Heap\>

> **ModernMiddleware**\<`Options`, `Heap`\> = [`WithModernTag`](WithModernTag.md)\<(`request`, `middlewareContext`) => `Promisable`\<`Response` \| `undefined` \| `void`\>\>

Defined in: [packages/api/src/types.ts:55](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/types.ts#L55)

The shape of a modern middleware function.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
