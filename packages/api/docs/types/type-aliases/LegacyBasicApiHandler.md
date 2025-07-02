[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyBasicApiHandler

# Type Alias: LegacyBasicApiHandler()\<RequestType, ResponseType\>

> **LegacyBasicApiHandler**\<`RequestType`, `ResponseType`\> = (`req`, `res`) => `Promisable`\<`unknown`\>

Defined in: [packages/api/src/types.ts:109](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L109)

The shape of a legacy fetch request handler that is also consumable by third
parties.

This is a reduced-functionality version of [LegacyApiHandler](LegacyApiHandler.md).

## Type Parameters

### RequestType

`RequestType` *extends* [`NextApiRequestLike`](../../index/interfaces/NextApiRequestLike.md) = [`NextApiRequestLike`](../../index/interfaces/NextApiRequestLike.md)

### ResponseType

`ResponseType` *extends* [`NextApiResponseLike`](../../index/type-aliases/NextApiResponseLike.md) = [`NextApiResponseLike`](../../index/type-aliases/NextApiResponseLike.md)

## Parameters

### req

`RequestType`

### res

`ResponseType`

## Returns

`Promisable`\<`unknown`\>
