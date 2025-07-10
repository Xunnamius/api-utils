[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernMiddleware

# Type Alias: ModernMiddleware\<Options, Heap\>

> **ModernMiddleware**\<`Options`, `Heap`\> = [`WithModernTag`](WithModernTag.md)\<(`request`, `middlewareContext`) => `Promisable`\<`Response` \| `undefined` \| `void`\>\>

Defined in: [packages/api/src/types.ts:59](https://github.com/Xunnamius/api-utils/blob/57bcbde0493ed3285651262eed2a32e963f10249/packages/api/src/types.ts#L59)

The shape of a modern middleware function.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
