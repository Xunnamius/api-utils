[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyApiHandler

# Type Alias: LegacyApiHandler()\<RequestType, ResponseType, Heap\>

> **LegacyApiHandler**\<`RequestType`, `ResponseType`, `Heap`\> = (`req`, `res`, `ctx`) => `Promisable`\<`unknown`\>

Defined in: [packages/api/src/types.ts:88](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L88)

The shape of a legacy fetch request handler.

Note that this type of handler is not necessarily consumable by third parties
(see [LegacyBasicApiHandler](LegacyBasicApiHandler.md)).

## Type Parameters

### RequestType

`RequestType` *extends* [`NextApiRequestLike`](../../index/interfaces/NextApiRequestLike.md)

### ResponseType

`ResponseType` *extends* [`NextApiResponseLike`](../../index/type-aliases/NextApiResponseLike.md)

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### req

`RequestType`

### res

`ResponseType`

### ctx

`Heap`

## Returns

`Promisable`\<`unknown`\>
