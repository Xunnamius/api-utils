[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/connect-databases](../README.md) / makeMiddleware

# Function: makeMiddleware()

> **makeMiddleware**(): (`_reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`) => `Promise`\<`void`\>

Defined in: [packages/api/src/middleware/connect-databases.ts:57](https://github.com/Xunnamius/api-utils/blob/38288e756f37a9fa3bac377fdbaa51608d8bbed9/packages/api/src/middleware/connect-databases.ts#L57)

Sets the database schema(s) if the NODE_ENV environment variable starts with
"production" or "development". Additionally hydrates the database(s) with
dummy data if NODE_ENV starts with "development" and the API_HYDRATE_DB
environment variable is defined.

This middleware will not pull in any non-production dependencies when used in
a production environment.

## Returns

> (`_reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`): `Promise`\<`void`\>

### Parameters

#### \_reqOrRequest

`Request` | [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

#### resOrModernContext

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md) | [`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), `EmptyObject`\>

#### maybeLegacyContext

`undefined` | [`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), `EmptyObject`\>

### Returns

`Promise`\<`void`\>
