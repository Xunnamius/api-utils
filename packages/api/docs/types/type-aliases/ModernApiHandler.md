[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernApiHandler

# Type Alias: ModernApiHandler()\<RequestType, ResponseType, Heap\>

> **ModernApiHandler**\<`RequestType`, `ResponseType`, `Heap`\> = (`request`, `ctx`) => `Promisable`\<`ResponseType` \| `undefined` \| `void`\>

Defined in: [packages/api/src/types.ts:27](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L27)

The shape of a modern fetch request handler.

Note that this type of handler is not necessarily consumable by third parties
(see [ModernBasicApiHandler](ModernBasicApiHandler.md)).

## Type Parameters

### RequestType

`RequestType` *extends* `Request`

### ResponseType

`ResponseType` *extends* `Response`

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### request

`RequestType`

### ctx

`Heap`

## Returns

`Promisable`\<`ResponseType` \| `undefined` \| `void`\>
