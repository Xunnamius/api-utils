[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernMiddleware

# Type Alias: ModernMiddleware\<Options, Heap\>

> **ModernMiddleware**\<`Options`, `Heap`\> = [`WithModernTag`](WithModernTag.md)\<(`request`, `middlewareContext`) => `Promisable`\<`Response` \| `undefined` \| `void`\>\>

Defined in: [packages/api/src/types.ts:59](https://github.com/Xunnamius/api-utils/blob/3e7489507eea9aa3d33b0bcc648e0389bef6f3f5/packages/api/src/types.ts#L59)

The shape of a modern middleware function.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
