[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/auth-request](../README.md) / default

# Function: default()

## Call Signature

> **default**\<`RequestType`, `ResponseType`\>(`request`, `context`): `Promise`\<`undefined` \| `ResponseType`\>

Defined in: [packages/api/src/middleware/auth-request.ts:44](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/auth-request.ts#L44)

Rejects unauth-able requests (via Authorization header).

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

Defined in: [packages/api/src/middleware/auth-request.ts:51](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/auth-request.ts#L51)

Rejects unauth-able requests (via Authorization header).

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
