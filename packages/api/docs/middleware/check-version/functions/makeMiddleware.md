[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/check-version](../README.md) / makeMiddleware

# Function: makeMiddleware()

> **makeMiddleware**(): (`_reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`) => `Promise`\<`undefined` \| `Response`\>

Defined in: [packages/api/src/middleware/check-version.ts:28](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/middleware/check-version.ts#L28)

Rejects requests to disabled versions of the API.

## Returns

> (`_reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`): `Promise`\<`undefined` \| `Response`\>

### Parameters

#### \_reqOrRequest

`Request` | [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

#### resOrModernContext

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md) | [`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), `EmptyObject`\>

#### maybeLegacyContext

`undefined` | [`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), `EmptyObject`\>

### Returns

`Promise`\<`undefined` \| `Response`\>
