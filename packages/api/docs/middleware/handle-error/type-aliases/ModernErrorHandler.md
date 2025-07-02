[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / ModernErrorHandler

# Type Alias: ModernErrorHandler()

> **ModernErrorHandler** = (`request`, `response`, `errorJson`) => `Promisable`\<`Error` \| `Response` \| `undefined` \| `void`\>

Defined in: [packages/api/src/middleware/handle-error.ts:54](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/handle-error.ts#L54)

Special middleware used to handle custom errors.

If you want to handle the custom error as if it were one of the well-known
error classes from `@-xun/api-strategy/error`, return said class from this
function.

Errors thrown from within this function are ignored.

## Parameters

### request

`Request`

### response

`Response`

### errorJson

`Partial`\<`JsonError`\>

## Returns

`Promisable`\<`Error` \| `Response` \| `undefined` \| `void`\>

## See

[middleware](../functions/default.md)
