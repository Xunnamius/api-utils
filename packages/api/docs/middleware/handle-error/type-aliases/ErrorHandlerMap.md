[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / ErrorHandlerMap

# Type Alias: ErrorHandlerMap\<ErrorHandler\>

> **ErrorHandlerMap**\<`ErrorHandler`\> = `Map`\<(...`args`) => `Error`, `ErrorHandler`\>

Defined in: [packages/api/src/middleware/handle-error.ts:82](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/handle-error.ts#L82)

A Map of Error class constructors to the special middleware that handles
them.

## Type Parameters

### ErrorHandler

`ErrorHandler` *extends* [`ModernErrorHandler`](ModernErrorHandler.md) \| [`LegacyErrorHandler`](LegacyErrorHandler.md)
