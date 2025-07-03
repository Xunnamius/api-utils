[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernApiHandlerWithHeap

# Type Alias: ModernApiHandlerWithHeap()\<Heap\>

> **ModernApiHandlerWithHeap**\<`Heap`\> = (`request`, `handlerContext`) => `Promisable`\<`Response` \| `undefined` \| `void`\>

Defined in: [packages/api/src/types.ts:36](https://github.com/Xunnamius/api-utils/blob/2e0fabcd55b7c3db9985d1dbdad536d0a6ac1016/packages/api/src/types.ts#L36)

The shape of a modern fetch request handler + an additional context
parameter.

Note that this type of handler is not necessarily consumable by third parties
(see [ModernApiHandler](ModernApiHandler.md)).

## Type Parameters

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### request

`Request`

### handlerContext

`Heap`

## Returns

`Promisable`\<`Response` \| `undefined` \| `void`\>
