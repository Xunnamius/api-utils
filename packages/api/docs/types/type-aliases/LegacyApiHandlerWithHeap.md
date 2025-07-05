[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyApiHandlerWithHeap

# Type Alias: LegacyApiHandlerWithHeap()\<Heap\>

> **LegacyApiHandlerWithHeap**\<`Heap`\> = (`req`, `res`, `handlerContext`) => `Promisable`\<`unknown`\>

Defined in: [packages/api/src/types.ts:82](https://github.com/Xunnamius/api-utils/blob/f86b6da3746432264ea1e1b00e1751b0fe171fe2/packages/api/src/types.ts#L82)

The shape of a legacy fetch request handler.

Note that this type of handler is not necessarily consumable by third parties
(see [LegacyApiHandler](LegacyApiHandler.md)).

## Type Parameters

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### req

[`NextApiRequestLike`](../../index/interfaces/NextApiRequestLike.md)

### res

[`NextApiResponseLike`](../../index/type-aliases/NextApiResponseLike.md)

### handlerContext

`Heap`

## Returns

`Promisable`\<`unknown`\>
