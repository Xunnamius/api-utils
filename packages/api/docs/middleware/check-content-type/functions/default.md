[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/check-content-type](../README.md) / default

# Function: default()

## Call Signature

> **default**\<`RequestType`, `ResponseType`\>(`request`, `context`): `Promise`\<`undefined` \| `ResponseType`\>

Defined in: [packages/api/src/middleware/check-content-type.ts:71](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/check-content-type.ts#L71)

Rejects requests that are not using an allowed content type. This middleware
should usually come _after_ check-method.

### Type Parameters

#### RequestType

`RequestType` *extends* `Request`

#### ResponseType

`ResponseType` *extends* `Response`

### Parameters

#### request

`RequestType`

#### context

[`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), `EmptyObject`\>

### Returns

`Promise`\<`undefined` \| `ResponseType`\>

## Call Signature

> **default**\<`RequestType`, `ResponseType`\>(`req`, `res`, `context`): `Promise`\<`void`\>

Defined in: [packages/api/src/middleware/check-content-type.ts:78](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/check-content-type.ts#L78)

Rejects requests that are not using an allowed content type. This middleware
should usually come _after_ check-method.

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

[`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), `EmptyObject`\>

### Returns

`Promise`\<`void`\>
