[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareContext

# Type Alias: MiddlewareContext\<Options, Heap, Middleware, PartialOptions\>

> **MiddlewareContext**\<`Options`, `Heap`, `Middleware`, `PartialOptions`\> = `object`

Defined in: [packages/api/src/types.ts:123](https://github.com/Xunnamius/api-utils/blob/c09789cf368e76cc20c657b2a1b00afeebcaaa9d/packages/api/src/types.ts#L123)

The shape of a middleware context object, potentially customized with
additional middleware-specific options.

Middleware functions should be order-agnostic. That is: the system should not
crash simply because the order of middleware functions (before or after the
handler executes respectively) changes.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

### Middleware

`Middleware` *extends* [`ModernOrLegacyMiddleware`](ModernOrLegacyMiddleware.md)\<`Options`, `Heap`\>

### PartialOptions

`PartialOptions` *extends* `"partial"` \| `"required"` = `"required"`

## Properties

### heap

> **heap**: `Heap`

Defined in: [packages/api/src/types.ts:213](https://github.com/Xunnamius/api-utils/blob/c09789cf368e76cc20c657b2a1b00afeebcaaa9d/packages/api/src/types.ts#L213)

A context object meant to be written to and read by any middleware.

After all middleware is finished running, `heap` is passed to the handler
as its `ctx` parameter, allowing middleware and handlers to more easily
share data.

***

### options

> **options**: `Options` & `"partial"` *extends* `PartialOptions` ? `Partial`\<`BaseOptions`\> : `BaseOptions`

Defined in: [packages/api/src/types.ts:217](https://github.com/Xunnamius/api-utils/blob/c09789cf368e76cc20c657b2a1b00afeebcaaa9d/packages/api/src/types.ts#L217)

Options expected by middleware functions at runtime.

***

### runtime

> **runtime**: `object`

Defined in: [packages/api/src/types.ts:132](https://github.com/Xunnamius/api-utils/blob/c09789cf368e76cc20c657b2a1b00afeebcaaa9d/packages/api/src/types.ts#L132)

Contains middleware use chain control functions and various metadata.

#### doAfterHandled()

> `readonly` **doAfterHandled**: (`middleware`) => `void`

Appends `middleware` to list of special internal middlewares that are
added and removed only by other middleware; they are not end-user facing.

Middleware with tasks that need to execute after the handler completes
successfully _but before the response is sent_ (e.g. cors) should add
those tasks via this function.

Tasks are always executed in order after the `use` middleware chain, the
handler, and/or the `useOnError` chain (when applicable) all execute
successfully.

**Unlike with `doAfterSent`, these internal middleware will ALWAYS delay
the server from responding to a request.**

Note that errors thrown by middleware added by this function are ignored.

##### Parameters

###### middleware

`UnwrapTagged`\<`Middleware`\>

##### Returns

`void`

#### doAfterSent()

> `readonly` **doAfterSent**: (`middleware`) => `void`

Appends `middleware` to list of special internal middlewares that are
added and removed only by other middleware; they are not end-user facing.

Middleware with tasks that need to execute after the handler completes
successfully _and after the response is sent_ (e.g. logging) should add
those tasks via this function.

Tasks are always executed in order after the `use` middleware chain, the
handler, and/or the `useOnError` chain (when applicable) all execute
successfully.

**Unlike with `doAfterHandled`, these internal middleware will NEVER
delay the server from responding to a request.**

Note that errors thrown by middleware added by this function are ignored.

##### Parameters

###### middleware

`UnwrapTagged`\<`Middleware`\>

##### Returns

`void`

#### done()

> `readonly` **done**: () => `void`

Stop calling middleware functions, effectively aborting execution of the
use chain. If a Response has not yet been returned (or
`response.end` hasn't been called if in legacy mode) before calling this
function, it will be called automatically. On abort, the handler will
also be skipped.

##### Returns

`void`

#### endpoint

> **endpoint**: `object`

Metadata describing the current endpoint.

##### endpoint.descriptor?

> `optional` **descriptor**: `string`

A parameterized path string in the form of a URI path corresponding to
the current endpoint. For example: `/my-endpoint/:some_id`.

Used for logging purposes only.

#### error

> `readonly` **error**: `unknown`

For middleware run via `useOnError` (and `postHandlerTasks`), the `error`
property will contain the thrown error object.

#### response

> `readonly` **response**: `Middleware` *extends* [`WithModernTag`](WithModernTag.md)\<`unknown`\> ? `Response` : `undefined`

For modern non-legacy middleware, this property contains the latest
Response instance returned by some earlier middleware or handler.

Once all middleware and handlers finish running, `response` is passed to
the server for final processing.

Note that mutating `response` in middleware added via `doAfterSent` will
have no effect.
