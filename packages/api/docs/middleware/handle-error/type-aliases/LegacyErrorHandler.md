[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / LegacyErrorHandler

# Type Alias: LegacyErrorHandler()

> **LegacyErrorHandler** = (`req`, `res`, `errorJson`) => `Promisable`\<`Error` \| `void`\>

Defined in: [packages/api/src/middleware/handle-error.ts:71](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/handle-error.ts#L71)

Special middleware used to handle custom errors.

If you want to handle the custom error as if it were one of the well-known
error classes from `@-xun/api-strategy/error`, return said class from this
function.

Errors thrown from within this function are ignored.

## Parameters

### req

[`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

### res

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md)

### errorJson

`Partial`\<`JsonError`\>

## Returns

`Promisable`\<`Error` \| `void`\>

## See

[middleware](../functions/default.md)
