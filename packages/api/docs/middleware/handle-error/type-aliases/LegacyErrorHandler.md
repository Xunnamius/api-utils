[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / LegacyErrorHandler

# Type Alias: LegacyErrorHandler\<Options, Heap\>

> **LegacyErrorHandler**\<`Options`, `Heap`\> = [`WithLegacyTag`](../../../types/type-aliases/WithLegacyTag.md)\<(`req`, `res`, `errorJson`, `middlewareContext`) => `Promisable`\<`Error` \| `void`\>\>

Defined in: [packages/api/src/middleware/handle-error.ts:85](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/middleware/handle-error.ts#L85)

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

## See

middleware
