[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / makeMiddleware

# Function: makeMiddleware()

> **makeMiddleware**(): (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`) => `Promise`\<`undefined` \| `Response`\>

Defined in: [packages/api/src/middleware/handle-error.ts:117](https://github.com/Xunnamius/api-utils/blob/c09789cf368e76cc20c657b2a1b00afeebcaaa9d/packages/api/src/middleware/handle-error.ts#L117)

Returns a generic error handling middleware.

**NOTE: said middleware should usually be the very last middleware to run on
the error handling middleware chain.**

## Returns

> (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`): `Promise`\<`undefined` \| `Response`\>

### Parameters

#### reqOrRequest

`Request` | [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

#### resOrModernContext

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md) | [`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md)\<[`ModernErrorHandler`](../type-aliases/ModernErrorHandler.md)\<`never`, `never`\> \| [`LegacyErrorHandler`](../type-aliases/LegacyErrorHandler.md)\<`never`, `never`\>\>, `EmptyObject`\>

#### maybeLegacyContext

`undefined` | [`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md)\<[`ModernErrorHandler`](../type-aliases/ModernErrorHandler.md)\<`never`, `never`\> \| [`LegacyErrorHandler`](../type-aliases/LegacyErrorHandler.md)\<`never`, `never`\>\>, `EmptyObject`\>

### Returns

`Promise`\<`undefined` \| `Response`\>
