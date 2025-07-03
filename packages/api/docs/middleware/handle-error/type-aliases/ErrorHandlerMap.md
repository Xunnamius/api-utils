[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / ErrorHandlerMap

# Type Alias: ErrorHandlerMap\<ErrorHandler\>

> **ErrorHandlerMap**\<`ErrorHandler`\> = `Map`\<(...`args`) => `Error`, `ErrorHandler`\>

Defined in: [packages/api/src/middleware/handle-error.ts:92](https://github.com/Xunnamius/api-utils/blob/2e0fabcd55b7c3db9985d1dbdad536d0a6ac1016/packages/api/src/middleware/handle-error.ts#L92)

A Map of Error class constructors to the special middleware that handles
them.

## Type Parameters

### ErrorHandler

`ErrorHandler` *extends* [`ModernErrorHandler`](ModernErrorHandler.md)\<`never`, `never`\> \| [`LegacyErrorHandler`](LegacyErrorHandler.md)\<`never`, `never`\>
