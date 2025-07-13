[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / makeMiddleware

# Function: makeMiddleware()

> **makeMiddleware**(): (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`) => `Promise`\<`undefined` \| `Response`\>

Defined in: [packages/api/src/middleware/handle-error.ts:120](https://github.com/Xunnamius/api-utils/blob/60863c4db4ba817b2926c481da6a42f07a7c9992/packages/api/src/middleware/handle-error.ts#L120)

Returns a generic error handling middleware.

**NOTE: said middleware should usually be the very last middleware to run on
the error handling middleware chain.**

## Returns

> (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`): `Promise`\<`undefined` \| `Response`\>

### Parameters

#### reqOrRequest

`Request` | [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

#### resOrModernContext

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md) | [`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md)\<[`ModernErrorHandler`](../type-aliases/ModernErrorHandler.md)\<`any`, `any`\> \| [`LegacyErrorHandler`](../type-aliases/LegacyErrorHandler.md)\<`any`, `any`\>\>, `EmptyObject`\>

#### maybeLegacyContext

`undefined` | [`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md)\<[`ModernErrorHandler`](../type-aliases/ModernErrorHandler.md)\<`any`, `any`\> \| [`LegacyErrorHandler`](../type-aliases/LegacyErrorHandler.md)\<`any`, `any`\>\>, `EmptyObject`\>

### Returns

`Promise`\<`undefined` \| `Response`\>
