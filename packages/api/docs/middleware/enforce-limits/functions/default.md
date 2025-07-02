[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/enforce-limits](../README.md) / default

# Function: default()

## Call Signature

> **default**\<`RequestType`, `ResponseType`\>(`request`, `context`): `Promise`\<`undefined` \| `ResponseType`\>

Defined in: [packages/api/src/middleware/enforce-limits.ts:27](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/enforce-limits.ts#L27)

Rejects requests from clients that have sent too many previous requests.

### Type Parameters

#### RequestType

`RequestType` *extends* `Request`

#### ResponseType

`ResponseType` *extends* `Response`

### Parameters

#### request

`RequestType`

#### context

[`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<`EmptyObject`, `EmptyObject`\>

### Returns

`Promise`\<`undefined` \| `ResponseType`\>

## Call Signature

> **default**\<`RequestType`, `ResponseType`\>(`req`, `res`, `context`): `Promise`\<`void`\>

Defined in: [packages/api/src/middleware/enforce-limits.ts:34](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/enforce-limits.ts#L34)

Rejects requests from clients that have sent too many previous requests.

### Type Parameters

#### RequestType

`RequestType` *extends* [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

#### ResponseType

`ResponseType` *extends* [`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md)

### Parameters

#### req

`RequestType`

#### res

`ResponseType`

#### context

[`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<`EmptyObject`, `EmptyObject`\>

### Returns

`Promise`\<`void`\>
