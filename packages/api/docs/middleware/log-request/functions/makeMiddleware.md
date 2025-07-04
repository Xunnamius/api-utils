[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/log-request](../README.md) / makeMiddleware

# Function: makeMiddleware()

> **makeMiddleware**(): (`_reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`) => `Promise`\<`void`\>

Defined in: [packages/api/src/middleware/log-request.ts:25](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/middleware/log-request.ts#L25)

Logs the response to each request after it is sent (i.e. `res.end()`).

## Returns

> (`_reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`): `Promise`\<`void`\>

### Parameters

#### \_reqOrRequest

`Request` | [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

#### resOrModernContext

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md) | [`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<`EmptyObject`, `EmptyObject`\>

#### maybeLegacyContext

`undefined` | [`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<`EmptyObject`, `EmptyObject`\>

### Returns

`Promise`\<`void`\>
