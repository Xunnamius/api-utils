[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [index](../README.md) / withMiddleware

# Function: withMiddleware()

## Call Signature

> **withMiddleware**\<`Options`, `Heap`\>(`handler`, `options`): [`ModernApiHandler`](../../types/type-aliases/ModernApiHandler.md)

Defined in: [packages/api/src/index.ts:71](https://github.com/Xunnamius/api-utils/blob/1f0c4ddbfee87314a3a69fe0605abddd045878f2/packages/api/src/index.ts#L71)

This function decorates a Request handler, returning a generic
Response-returning middleware runner function compatible with tools
like Cloudflare Workers.

The returned function additionally exposes HTTP method properties (e.g.
`GET`, `POST`) compatible with the Next.js App Router.

Passing `undefined` as `handler`, or not returning a Response from
one of your middlewares/handler, will trigger an `HTTP 501 Not Implemented`
response. This can be used to to stub out endpoints and their middleware for
later implementation.

### Type Parameters

#### Options

`Options` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

#### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\> = `Record`\<`PropertyKey`, `unknown`\>

### Parameters

#### handler

`undefined` | [`ModernApiHandlerWithHeap`](../../types/type-aliases/ModernApiHandlerWithHeap.md)\<`Heap`\>

#### options

[`WithMiddlewareOptions`](../../types/type-aliases/WithMiddlewareOptions.md)\<`Options`, `Heap`, [`ModernMiddleware`](../../types/type-aliases/ModernMiddleware.md)\<`Options`, `Heap`\>\>

### Returns

[`ModernApiHandler`](../../types/type-aliases/ModernApiHandler.md)

## Call Signature

> **withMiddleware**\<`Options`, `Heap`\>(`handler`, `options`): [`LegacyApiHandler`](../../types/type-aliases/LegacyApiHandler.md)

Defined in: [packages/api/src/index.ts:88](https://github.com/Xunnamius/api-utils/blob/1f0c4ddbfee87314a3a69fe0605abddd045878f2/packages/api/src/index.ts#L88)

This function decorates a [LegacyApiHandlerWithHeap](../../types/type-aliases/LegacyApiHandlerWithHeap.md), returning a
middleware runner compatible with legacy middleware like Express or the
Next.js Pages router.

Passing `undefined` as `handler`, or not calling `res.end()` nor sending
headers from at least one of your middlewares/handler, will trigger an `HTTP
501 Not Implemented` response. This can be used to to stub out endpoints and
their middleware for later implementation.

### Type Parameters

#### Options

`Options` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

#### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\> = `Record`\<`PropertyKey`, `unknown`\>

### Parameters

#### handler

`undefined` | [`LegacyApiHandlerWithHeap`](../../types/type-aliases/LegacyApiHandlerWithHeap.md)\<`Heap`\>

#### options

[`WithMiddlewareOptions`](../../types/type-aliases/WithMiddlewareOptions.md)\<`Options`, `Heap`, [`LegacyMiddleware`](../../types/type-aliases/LegacyMiddleware.md)\<`Options`, `Heap`\>\>

### Returns

[`LegacyApiHandler`](../../types/type-aliases/LegacyApiHandler.md)
