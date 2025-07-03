[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyApiHandler

# Type Alias: LegacyApiHandler()

> **LegacyApiHandler** = (`req`, `res`) => `Promisable`\<`unknown`\>

Defined in: [packages/api/src/types.ts:60](https://github.com/Xunnamius/api-utils/blob/1f0c4ddbfee87314a3a69fe0605abddd045878f2/packages/api/src/types.ts#L60)

The shape of a legacy fetch request handler that is also consumable by third
parties (currently optimized for Next.js's Pages router).

This is a reduced-functionality version of [LegacyApiHandlerWithHeap](LegacyApiHandlerWithHeap.md).

## Parameters

### req

[`NextApiRequestLike`](../../index/interfaces/NextApiRequestLike.md)

### res

[`NextApiResponseLike`](../../index/type-aliases/NextApiResponseLike.md)

## Returns

`Promisable`\<`unknown`\>
