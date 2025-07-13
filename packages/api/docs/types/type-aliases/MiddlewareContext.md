[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareContext

# Type Alias: MiddlewareContext\<Options, Heap, Middleware, PartialOptions\>

> **MiddlewareContext**\<`Options`, `Heap`, `Middleware`, `PartialOptions`\> = `object`

Defined in: [packages/api/src/types.ts:144](https://github.com/Xunnamius/api-utils/blob/60863c4db4ba817b2926c481da6a42f07a7c9992/packages/api/src/types.ts#L144)

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

Defined in: [packages/api/src/types.ts:275](https://github.com/Xunnamius/api-utils/blob/60863c4db4ba817b2926c481da6a42f07a7c9992/packages/api/src/types.ts#L275)

A context object meant to be written to and read by any middleware.

After all middleware is finished running, `heap` is passed to the handler
as its `ctx` parameter, allowing middleware and handlers to more easily
share data.

***

### options

> **options**: `Options` & `"partial"` *extends* `PartialOptions` ? `Partial`\<`BaseOptions`\> : `BaseOptions` & `Middleware` *extends* [`WithModernTag`](WithModernTag.md)\<`unknown`\> ? `object` : `object`

Defined in: [packages/api/src/types.ts:279](https://github.com/Xunnamius/api-utils/blob/60863c4db4ba817b2926c481da6a42f07a7c9992/packages/api/src/types.ts#L279)

Options expected by middleware functions at runtime.

***

### runtime

> **runtime**: `object`

Defined in: [packages/api/src/types.ts:153](https://github.com/Xunnamius/api-utils/blob/60863c4db4ba817b2926c481da6a42f07a7c9992/packages/api/src/types.ts#L153)

Contains middleware use chain control functions and various metadata.

#### doAfterHandled

> `readonly` **doAfterHandled**: `Middleware` *extends* [`WithModernTag`](WithModernTag.md)\<`unknown`\> ? (`middleware`) => `void` : `undefined`

Appends `middleware` to list of special internal middlewares that are
added and removed only by other middleware; they are not end-user facing.

Modern middleware with tasks that need to execute after the handler
completes successfully _but before the response is sent_ (e.g. cors)
should add those tasks via this function.

This method is only available when using modern middleware. When using
legacy middleware, handle any "post-handler" tasks using the `res`
parameter instead.

Tasks are always executed in order after the `use` middleware chain, the
handler, and/or the `useOnError` chain (when applicable) all execute
successfully. And, though they have access to the same middleware context
as actual middleware, the `runtime.done`, `runtime.doAfterHandled`, and
`runtime.doAfterSent` methods are unavailable to tasks.

**Unlike with `doAfterSent`, these internal middleware will ALWAYS delay
the server from responding to a request.**

Note that errors thrown by middleware added by this function are ignored.

#### doAfterSent()

> `readonly` **doAfterSent**: (`middleware`) => `void`

Appends `middleware` to list of special internal middlewares that are
added and removed only by other middleware; they are not end-user facing.

Middleware with tasks that need to execute after the handler completes
successfully _and after the response is sent_ (e.g. logging) should add
those tasks via this function.

Tasks are always executed in order after the `use` middleware chain, the
handler, and/or the `useOnError` chain (when applicable) all execute
successfully. And, though they have access to the same middleware context
as actual middleware, the `runtime.done`, `runtime.doAfterHandled`, and
`runtime.doAfterSent` methods are unavailable to tasks.

**Unlike with `doAfterHandled`, these internal middleware will (1) always
run asynchronously regardless of legacy/modern and (2) NEVER delay the
server from responding to a request.**

Note that errors thrown by middleware added by this function are ignored.

##### Parameters

###### middleware

`UnwrapTagged`\<`Middleware`\>

##### Returns

`void`

#### done()

> `readonly` **done**: () => `void`

Stop calling middleware functions, effectively aborting execution of the
current chain. If a Response has not yet been returned (or
`response.end` hasn't been called if in legacy mode) before calling this
function, it will be called automatically. On abort, the handler will
also be skipped, but any registered tasks will _not_ be skipped.

Note that, though they have access to the same middleware context as
actual middleware, the `runtime.done`, `runtime.doAfterHandled`, and
`runtime.doAfterSent` methods are unavailable to tasks (which are added
via `doAfterHandled`/`doAfterSent`).

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

> **response**: `Middleware` *extends* [`WithModernTag`](WithModernTag.md)\<`unknown`\> ? `Response` : `undefined`

For modern non-legacy middleware, this property contains the latest
Response instance returned by some earlier middleware or handler.

To modify the current response without sending it to the client
immediately (which is what happens when you return a Response
from some middleware or handler), mutate this property.

Do note that this property is backed by a setter function that will
**merge the modified Response on top of the current
Response**. This is also true of Responses that are
returned normally.

To overwrite an existing response body, use `''` instead of `null`, with
the latter being ignored in favor of existing content. To overwrite an
existing response status, pass it to the Response constructor as
normal. Note that (1) not passing a status to the Response
constructor defaults it to `HTTP 200`, which will overwrite the current
status and (2) once a status >=400 is set, requests with statuses <400
will have their statuses ignored when merged. To preserve the current
response status instead of overwriting it, pass in
`runtime.response.status` when constructing the new Response.

To dangerously _completely_ overwrite the current `runtime.response`
property, first set it to `null`, which will cause it to reset to its
default initial value (i.e. `new Response()`). This is not recommended
(nor supported by intellisense), since middleware can be invoked in any
order and modify the response in various unpredictable ways.

Once all middleware and handlers finish running, this property is passed
directly to the server for final processing.

Also note that mutating this property in middleware added via
`doAfterSent` will have no effect.
