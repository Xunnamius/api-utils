[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / LegacyMiddleware

# Type Alias: LegacyMiddleware\<Options, RequestType, ResponseType, Heap\>

> **LegacyMiddleware**\<`Options`, `RequestType`, `ResponseType`, `Heap`\> = [`WithLegacyTag`](WithLegacyTag.md)\<(`req`, `res`, `context`) => `Promisable`\<`unknown`\>\>

Defined in: [packages/api/src/types.ts:117](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L117)

The shape of a legacy middleware function.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### RequestType

`RequestType` *extends* [`NextApiRequestLike`](../../index/interfaces/NextApiRequestLike.md)

### ResponseType

`ResponseType` *extends* [`NextApiResponseLike`](../../index/type-aliases/NextApiResponseLike.md)

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
