[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/use-cors](../README.md) / makeMiddleware

# Function: makeMiddleware()

> **makeMiddleware**(): (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`) => `Promise`\<`undefined` \| `Response`\>

Defined in: [packages/api/src/middleware/use-cors.ts:58](https://github.com/Xunnamius/api-utils/blob/f159b4026fbac8d4de769d2a9e8cfaddf85d9e96/packages/api/src/middleware/use-cors.ts#L58)

Allows _cross-origin_ requests. Note that this can be dangerous (huge
security hole) and should only be used for public APIs.

When present, this should be among if not the **very first** middleware in
the use chain!

**NOTE: this middleware is not needed if using a framework like Next.js (App
Router) that handles CORS headers for you.**

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

## See

[defaultAllowedCorsMethods](../variables/defaultAllowedCorsMethods.md)
