[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / ErrorHandlerMap

# Type Alias: ErrorHandlerMap\<ErrorHandler\>

> **ErrorHandlerMap**\<`ErrorHandler`\> = `Map`\<(...`args`) => `Error`, `ErrorHandler`\>

Defined in: [packages/api/src/middleware/handle-error.ts:92](https://github.com/Xunnamius/api-utils/blob/c09789cf368e76cc20c657b2a1b00afeebcaaa9d/packages/api/src/middleware/handle-error.ts#L92)

A Map of Error class constructors to the special middleware that handles
them.

## Type Parameters

### ErrorHandler

`ErrorHandler` *extends* [`ModernErrorHandler`](ModernErrorHandler.md)\<`never`, `never`\> \| [`LegacyErrorHandler`](LegacyErrorHandler.md)\<`never`, `never`\>
