[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/use-cors](../README.md) / default

# Function: default()

## Call Signature

> **default**\<`RequestType`, `ResponseType`\>(`request`, `context`): `Promise`\<`undefined` \| `ResponseType`\>

Defined in: [packages/api/src/middleware/use-cors.ts:43](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/use-cors.ts#L43)

Allows _cross-origin_ requests for the most popular request types. **Note
that this can be dangerous (huge security hole) and should only be used for
public APIs**.

When present, this should be among the very first middleware in the
before-handler use chain (certainly before the `check-method` middleware).

By default, allowed CORS methods are: `GET`, `HEAD`, `PUT`, `PATCH`, `POST`,
and `DELETE`.

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

Defined in: [packages/api/src/middleware/use-cors.ts:50](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/use-cors.ts#L50)

Allows _cross-origin_ requests for the most popular request types. **Note
that this can be dangerous (huge security hole) and should only be used for
public APIs**.

When present, this should be among the very first middleware in the
before-handler use chain (certainly before the `check-method` middleware).

By default, allowed CORS methods are: `GET`, `HEAD`, `PUT`, `PATCH`, `POST`,
and `DELETE`.

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
