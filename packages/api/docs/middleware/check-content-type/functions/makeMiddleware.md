[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/check-content-type](../README.md) / makeMiddleware

# Function: makeMiddleware()

> **makeMiddleware**(): (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`) => `Promise`\<`undefined` \| `Response`\>

Defined in: [packages/api/src/middleware/check-content-type.ts:71](https://github.com/Xunnamius/api-utils/blob/f86b6da3746432264ea1e1b00e1751b0fe171fe2/packages/api/src/middleware/check-content-type.ts#L71)

Rejects requests that are not using an allowed content type. This middleware
should usually come _after_ check-method.

## Returns

> (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`): `Promise`\<`undefined` \| `Response`\>

### Parameters

#### reqOrRequest

`Request` | [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

#### resOrModernContext

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md) | [`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), `EmptyObject`\>

#### maybeLegacyContext

`undefined` | [`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), `EmptyObject`\>

### Returns

`Promise`\<`undefined` \| `Response`\>
