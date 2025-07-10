[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyApiHandlerWithHeap

# Type Alias: LegacyApiHandlerWithHeap()\<Heap\>

> **LegacyApiHandlerWithHeap**\<`Heap`\> = (`req`, `res`, `handlerContext`) => `Promisable`\<`unknown`\>

Defined in: [packages/api/src/types.ts:86](https://github.com/Xunnamius/api-utils/blob/57bcbde0493ed3285651262eed2a32e963f10249/packages/api/src/types.ts#L86)

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
