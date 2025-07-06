[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyApiHandlerWithHeap

# Type Alias: LegacyApiHandlerWithHeap()\<Heap\>

> **LegacyApiHandlerWithHeap**\<`Heap`\> = (`req`, `res`, `handlerContext`) => `Promisable`\<`unknown`\>

Defined in: [packages/api/src/types.ts:86](https://github.com/Xunnamius/api-utils/blob/20b3c0a8fb0d738da534e0b5a18ecc7bfb431124/packages/api/src/types.ts#L86)

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
