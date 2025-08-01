[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernApiHandlerWithHeap

# Type Alias: ModernApiHandlerWithHeap()\<Heap\>

> **ModernApiHandlerWithHeap**\<`Heap`\> = (`request`, `handlerContext`) => `Promisable`\<`Response` \| `undefined` \| `void`\>

Defined in: [packages/api/src/types.ts:51](https://github.com/Xunnamius/api-utils/blob/183a3e5b3fec7a1bf06d5be3da477b72510b5586/packages/api/src/types.ts#L51)

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
