[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernApiHandlerWithHeap

# Type Alias: ModernApiHandlerWithHeap()\<Heap\>

> **ModernApiHandlerWithHeap**\<`Heap`\> = (`request`, `handlerContext`) => `Promisable`\<`Response` \| `undefined` \| `void`\>

Defined in: [packages/api/src/types.ts:47](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/types.ts#L47)

The shape of a modern fetch request handler + an additional context
parameter.

Note that returning a Response instance will immediately send a
response and end the middleware execution chain. To prevent the chain from
ending, do not return a Response. To edit the current response in
passing, see the `runtime.response` property of [MiddlewareContext](MiddlewareContext.md).

Also note that this type of handler is not necessarily consumable by third
parties (see [ModernApiHandler](ModernApiHandler.md) for that).

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
