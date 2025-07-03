[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / ModernErrorHandler

# Type Alias: ModernErrorHandler()\<Options, Heap\>

> **ModernErrorHandler**\<`Options`, `Heap`\> = (`request`, `response`, `errorJson`, `middlewareContext`) => `Promisable`\<`Error` \| `Response` \| `undefined` \| `void`\>

Defined in: [packages/api/src/middleware/handle-error.ts:57](https://github.com/Xunnamius/api-utils/blob/c09789cf368e76cc20c657b2a1b00afeebcaaa9d/packages/api/src/middleware/handle-error.ts#L57)

Special middleware used to handle custom errors.

If you want to handle the custom error as if it were one of the well-known
error classes from `@-xun/api-strategy/error`, return said class from this
function.

Errors thrown from within this function are ignored.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### request

`Request`

### response

`Response`

### errorJson

`Partial`\<`JsonError`\>

### middlewareContext

[`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<`Options`, `Heap`\>

## Returns

`Promisable`\<`Error` \| `Response` \| `undefined` \| `void`\>

## See

middleware
