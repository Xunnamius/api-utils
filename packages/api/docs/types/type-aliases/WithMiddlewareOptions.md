[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / WithMiddlewareOptions

# Type Alias: WithMiddlewareOptions\<Options, Heap, Middleware\>

> **WithMiddlewareOptions**\<`Options`, `Heap`, `Middleware`\> = `object` & `Middleware` *extends* [`WithModernTag`](WithModernTag.md)\<`unknown`\> ? `Partial`\<`Options`\> *extends* `Options` ? `object` : `object` : `Middleware` *extends* [`WithLegacyTag`](WithLegacyTag.md)\<`unknown`\> ? `object` : `object`

Defined in: [packages/api/src/types.ts:355](https://github.com/Xunnamius/api-utils/blob/5da7e0f39c76927221d59796ee606e41a5525952/packages/api/src/types.ts#L355)

## Type declaration

### descriptor

> **descriptor**: [`MiddlewareContext`](MiddlewareContext.md)\<`Options`, `Heap`, `Middleware`\>\[`"runtime"`\]\[`"endpoint"`\]\[`"descriptor"`\]

A parameterized path string in the form of a URI path corresponding to the
current endpoint. For example: `/my-endpoint/:some_id`.

Used for logging purposes only.

### options?

> `optional` **options**: [`MiddlewareContext`](MiddlewareContext.md)\<`Options`, `Heap`, `Middleware`, `"partial"`\>\[`"options"`\]

Various options made available to all middleware and handlers.

### use

> **use**: [`ExportedMiddleware`](ExportedMiddleware.md)\<`any`, `any`\>[]

An array of middleware functions that will be executed in order, each
receiving a chance to mutate the request and short-circuit the "use chain"
to deliver a response.

### useOnError?

> `optional` **useOnError**: [`ExportedMiddleware`](ExportedMiddleware.md)\<`any`, `any`\>[]

When a middleware or handler throws, this secondary array of middleware
functions are executed in order similar to `use`.

Unlike `use`, error-handling middleware have access to the
`MiddlewareContext.runtime.error` property, which contains the uncaught
error that interrupted the primary use chain.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

### Middleware

`Middleware` *extends* [`ModernOrLegacyMiddleware`](ModernOrLegacyMiddleware.md)\<`Options`, `Heap`\>

## See

`withMiddleware`
