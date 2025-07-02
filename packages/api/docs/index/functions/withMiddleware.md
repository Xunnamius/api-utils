[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [index](../README.md) / withMiddleware

# Function: withMiddleware()

## Call Signature

> **withMiddleware**\<`Options`, `RequestType`, `ResponseType`, `Heap`\>(...`args`): [`ModernBasicApiHandler`](../../types/type-aliases/ModernBasicApiHandler.md)\<`RequestType`\>

Defined in: [packages/api/src/index.ts:74](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/index.ts#L74)

This function decorates a Request handler, returning a generic
Response-returning middleware runner function compatible with tools
like Cloudflare Workers.

The returned function additionally exposes HTTP method properties (e.g.
`GET`, `POST`) compatible with the Next.js App Router.

Passing `undefined` as `handler`, or not returning a Response from
your handler/middleware, will trigger an `HTTP 501 Not Implemented` response.
This can be used to to stub out endpoints and their middleware for later
implementation.

### Type Parameters

#### Options

`Options` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

#### RequestType

`RequestType` *extends* `Request` = `Request`

#### ResponseType

`ResponseType` *extends* `Response` = `Response`

#### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\> = `Record`\<`PropertyKey`, `unknown`\>

### Parameters

#### args

...\[[`ModernApiHandler`](../../types/type-aliases/ModernApiHandler.md)\<`RequestType`, `ResponseType`, `Heap`\>, [`WithMiddlewareOptions`](../../types/type-aliases/WithMiddlewareOptions.md)\<`Options`, `Heap`, [`ModernMiddleware`](../../types/type-aliases/ModernMiddleware.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>\>\]

### Returns

[`ModernBasicApiHandler`](../../types/type-aliases/ModernBasicApiHandler.md)\<`RequestType`\>

## Call Signature

> **withMiddleware**\<`Options`, `RequestType`, `ResponseType`, `Heap`\>(...`args`): [`LegacyBasicApiHandler`](../../types/type-aliases/LegacyBasicApiHandler.md)\<`RequestType`\>

Defined in: [packages/api/src/index.ts:94](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/index.ts#L94)

This function decorates a [LegacyApiHandler](../../types/type-aliases/LegacyApiHandler.md), returning a
middleware runner compatible with legacy middleware like Express or the
Next.js Pages router.

Passing `undefined` as `handler`, or not calling `res.end()` (and not sending
headers) from your handler nor middleware, will trigger an `HTTP 501 Not
Implemented` response. This can be used to to stub out endpoints and their
middleware for later implementation.

### Type Parameters

#### Options

`Options` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

#### RequestType

`RequestType` *extends* [`NextApiRequestLike`](../interfaces/NextApiRequestLike.md) = [`NextApiRequestLike`](../interfaces/NextApiRequestLike.md)

#### ResponseType

`ResponseType` *extends* [`NextApiResponseLike`](../type-aliases/NextApiResponseLike.md) = [`NextApiResponseLike`](../type-aliases/NextApiResponseLike.md)

#### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\> = `Record`\<`PropertyKey`, `unknown`\>

### Parameters

#### args

...\[[`LegacyApiHandler`](../../types/type-aliases/LegacyApiHandler.md)\<`RequestType`, `ResponseType`, `Heap`\>, [`WithMiddlewareOptions`](../../types/type-aliases/WithMiddlewareOptions.md)\<`Options`, `Heap`, [`LegacyMiddleware`](../../types/type-aliases/LegacyMiddleware.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>\>\]

### Returns

[`LegacyBasicApiHandler`](../../types/type-aliases/LegacyBasicApiHandler.md)\<`RequestType`\>
