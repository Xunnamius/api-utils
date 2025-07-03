[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyApiHandler

# Type Alias: LegacyApiHandler()

> **LegacyApiHandler** = (`req`, `res`) => `Promisable`\<`unknown`\>

Defined in: [packages/api/src/types.ts:60](https://github.com/Xunnamius/api-utils/blob/c09789cf368e76cc20c657b2a1b00afeebcaaa9d/packages/api/src/types.ts#L60)

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
