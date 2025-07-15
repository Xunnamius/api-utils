[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/check-method](../README.md) / makeMiddleware

# Function: makeMiddleware()

> **makeMiddleware**(): (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`) => `Promise`\<`void`\>

Defined in: [packages/api/src/middleware/check-method.ts:40](https://github.com/Xunnamius/api-utils/blob/e344f26c2c71ff2ab26a4bf6ee6f0fc1cb9a441b/packages/api/src/middleware/check-method.ts#L40)

Rejects requests that are either using a disallowed method or not using an
allowed method.

Note that this middleware is only for legacy applications that are relying on
`IncomingMessage` and `NextApiRequestLike` instead of a more modern
Request-based approach.

## Returns

> (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`): `Promise`\<`void`\>

### Parameters

#### reqOrRequest

`Request` | [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

#### resOrModernContext

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md) | [`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), `EmptyObject`\>

#### maybeLegacyContext

`undefined` | [`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), `EmptyObject`\>

### Returns

`Promise`\<`void`\>
