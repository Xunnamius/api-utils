[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / default

# Function: default()

## Call Signature

> **default**\<`RequestType`, `ResponseType`\>(`request`, `context`): `Promise`\<`undefined` \| `ResponseType`\>

Defined in: [packages/api/src/middleware/handle-error.ts:99](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/handle-error.ts#L99)

Generic error handling middleware. **This should usually be the very last
middleware to run on the error handling middleware chain.**

### Type Parameters

#### RequestType

`RequestType` *extends* `Request`

#### ResponseType

`ResponseType` *extends* `Response`

### Parameters

#### request

`RequestType`

#### context

[`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md)\<[`ModernErrorHandler`](../type-aliases/ModernErrorHandler.md)\>, `EmptyObject`\>

### Returns

`Promise`\<`undefined` \| `ResponseType`\>

## Call Signature

> **default**\<`RequestType`, `ResponseType`\>(`req`, `res`, `context`): `Promise`\<`void`\>

Defined in: [packages/api/src/middleware/handle-error.ts:106](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/handle-error.ts#L106)

Generic error handling middleware. **This should usually be the very last
middleware to run on the error handling middleware chain.**

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

[`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md)\<[`LegacyErrorHandler`](../type-aliases/LegacyErrorHandler.md)\>, `EmptyObject`\>

### Returns

`Promise`\<`void`\>
