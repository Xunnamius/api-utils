[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/add-raw-body](../README.md) / makeMiddleware

# Function: makeMiddleware()

> **makeMiddleware**(): (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`) => `Promise`\<`void`\>

Defined in: [packages/api/src/middleware/add-raw-body.ts:71](https://github.com/Xunnamius/api-utils/blob/5d75eafe8fcae226a3b6f99a43817184692fd9bf/packages/api/src/middleware/add-raw-body.ts#L71)

Adds a `rawBody` property into the heap, making it available to all other
middleware and handlers.

`rawBody` contains the raw unparsed content of the request body if it exists
or `undefined` if it does not. `req.body` is still parsed like normal using a
custom implementation of Next.js's body parser.

To use this middleware, Next.js's body parser must be disabled via route
configuration like so:

```TypeScript
export const config = {
  api: {
    bodyParser: false
  },
}
```

Note that this middleware is only for legacy applications that are relying on
`IncomingMessage` and `NextApiRequestLike` instead of a more modern
Request-based approach. Additionally, this middleware cannot be used
with other middleware or routes that also directly consume the request body
in a special way, such as when using streams.

## Returns

> (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`): `Promise`\<`void`\>

### Parameters

#### reqOrRequest

`Request` | [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

#### resOrModernContext

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md) | [`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), [`Context`](../type-aliases/Context.md)\>

#### maybeLegacyContext

`undefined` | [`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), [`Context`](../type-aliases/Context.md)\>

### Returns

`Promise`\<`void`\>

## See

https://nextjs.org/docs/api-routes/api-middlewares#custom-config
