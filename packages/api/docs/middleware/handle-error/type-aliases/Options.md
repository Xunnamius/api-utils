[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / Options

# Type Alias: Options\<ErrorHandler\>

> **Options**\<`ErrorHandler`\> = `object`

Defined in: [packages/api/src/middleware/handle-error.ts:86](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/handle-error.ts#L86)

## Type Parameters

### ErrorHandler

`ErrorHandler` *extends* [`ModernErrorHandler`](ModernErrorHandler.md) \| [`LegacyErrorHandler`](LegacyErrorHandler.md)

## Properties

### errorHandlers?

> `optional` **errorHandlers**: [`ErrorHandlerMap`](ErrorHandlerMap.md)\<`ErrorHandler`\>

Defined in: [packages/api/src/middleware/handle-error.ts:90](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/handle-error.ts#L90)

A mapping of Error classes and the functions that handle them.
