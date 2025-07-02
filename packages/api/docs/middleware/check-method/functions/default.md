[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/check-method](../README.md) / default

# Function: default()

## Call Signature

> **default**\<`RequestType`, `ResponseType`\>(`request`, `context`): `Promise`\<`undefined` \| `ResponseType`\>

Defined in: [packages/api/src/middleware/check-method.ts:37](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/check-method.ts#L37)

Rejects requests that are either using a disallowed method or not using an
allowed method.

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

Defined in: [packages/api/src/middleware/check-method.ts:44](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/check-method.ts#L44)

Rejects requests that are either using a disallowed method or not using an
allowed method.

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
