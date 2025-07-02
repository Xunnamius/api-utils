[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/add-raw-body](../README.md) / default

# Function: default()

> **default**\<`RequestType`, `ResponseType`\>(`req`, `res`, `context`): `Promise`\<`void`\>

Defined in: [packages/api/src/middleware/add-raw-body.ts:76](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/add-raw-body.ts#L76)

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
`IncomingMessage` and [NextApiRequestLike](../../../index/interfaces/NextApiRequestLike.md) instead of a more modern
Request-based approach. Additionally, this middleware cannot be used
with other middleware or routes that also directly consume the request body
in a special way, such as when using streams.

## Type Parameters

### RequestType

`RequestType` *extends* [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

### ResponseType

`ResponseType` *extends* [`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md)

## Parameters

### req

`RequestType`

### res

`ResponseType`

### context

[`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<[`Options`](../type-aliases/Options.md), [`Context`](../type-aliases/Context.md)\>

## Returns

`Promise`\<`void`\>

## See

https://nextjs.org/docs/api-routes/api-middlewares#custom-config
