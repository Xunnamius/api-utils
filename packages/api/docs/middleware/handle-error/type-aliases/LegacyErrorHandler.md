[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / LegacyErrorHandler

# Type Alias: LegacyErrorHandler()\<Options, Heap\>

> **LegacyErrorHandler**\<`Options`, `Heap`\> = (`req`, `res`, `errorJson`, `middlewareContext`) => `Promisable`\<`Error` \| `void`\>

Defined in: [packages/api/src/middleware/handle-error.ts:78](https://github.com/Xunnamius/api-utils/blob/1f0c4ddbfee87314a3a69fe0605abddd045878f2/packages/api/src/middleware/handle-error.ts#L78)

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

### req

[`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

### res

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md)

### errorJson

`Partial`\<`JsonError`\>

### middlewareContext

[`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<`Options`, `Heap`\>

## Returns

`Promisable`\<`Error` \| `void`\>

## See

middleware
