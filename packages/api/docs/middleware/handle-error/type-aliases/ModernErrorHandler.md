[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / ModernErrorHandler

# Type Alias: ModernErrorHandler\<Options, Heap\>

> **ModernErrorHandler**\<`Options`, `Heap`\> = [`WithModernTag`](../../../types/type-aliases/WithModernTag.md)\<(`request`, `response`, `errorJson`, `middlewareContext`) => `Promisable`\<`Error` \| `Response` \| `undefined` \| `void`\>\>

Defined in: [packages/api/src/middleware/handle-error.ts:62](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/middleware/handle-error.ts#L62)

Special middleware used to handle custom errors.

If you want to handle the custom error as if it were one of the well-known
error classes from `@-xun/api-strategy/error`, return said class from this
function.

Note that (1) errors thrown from within this middleware are ignored and (2)
if this middleware returns a response with a status `<400`, @-xun/api will
assume the error was not handled and will re-throw it.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## See

middleware
