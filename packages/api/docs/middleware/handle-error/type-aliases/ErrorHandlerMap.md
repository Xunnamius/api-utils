[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / ErrorHandlerMap

# Type Alias: ErrorHandlerMap\<ErrorHandler\>

> **ErrorHandlerMap**\<`ErrorHandler`\> = `Map`\<(...`args`) => `Error`, `ErrorHandler`\>

Defined in: [packages/api/src/middleware/handle-error.ts:92](https://github.com/Xunnamius/api-utils/blob/1f0c4ddbfee87314a3a69fe0605abddd045878f2/packages/api/src/middleware/handle-error.ts#L92)

A Map of Error class constructors to the special middleware that handles
them.

## Type Parameters

### ErrorHandler

`ErrorHandler` *extends* [`ModernErrorHandler`](ModernErrorHandler.md)\<`never`, `never`\> \| [`LegacyErrorHandler`](LegacyErrorHandler.md)\<`never`, `never`\>
