[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernMiddleware

# Type Alias: ModernMiddleware\<Options, Heap\>

> **ModernMiddleware**\<`Options`, `Heap`\> = [`WithModernTag`](WithModernTag.md)\<(`request`, `middlewareContext`) => `Promisable`\<`Response` \| `undefined` \| `void`\>\>

Defined in: [packages/api/src/types.ts:59](https://github.com/Xunnamius/api-utils/blob/5d75eafe8fcae226a3b6f99a43817184692fd9bf/packages/api/src/types.ts#L59)

The shape of a modern middleware function.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
