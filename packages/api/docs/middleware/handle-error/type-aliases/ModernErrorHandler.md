[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / ModernErrorHandler

# Type Alias: ModernErrorHandler\<Options, Heap\>

> **ModernErrorHandler**\<`Options`, `Heap`\> = [`WithModernTag`](../../../types/type-aliases/WithModernTag.md)\<(`request`, `response`, `errorJson`, `middlewareContext`) => `Promisable`\<`Error` \| `Response` \| `undefined` \| `void`\>\>

Defined in: [packages/api/src/middleware/handle-error.ts:63](https://github.com/Xunnamius/api-utils/blob/5d75eafe8fcae226a3b6f99a43817184692fd9bf/packages/api/src/middleware/handle-error.ts#L63)

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
