[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / Options

# Type Alias: Options\<ErrorHandler\>

> **Options**\<`ErrorHandler`\> = `object`

Defined in: [packages/api/src/middleware/handle-error.ts:98](https://github.com/Xunnamius/api-utils/blob/f86b6da3746432264ea1e1b00e1751b0fe171fe2/packages/api/src/middleware/handle-error.ts#L98)

## Type Parameters

### ErrorHandler

`ErrorHandler` *extends* [`ModernErrorHandler`](ModernErrorHandler.md)\<`never`, `never`\> \| [`LegacyErrorHandler`](LegacyErrorHandler.md)\<`never`, `never`\>

## Properties

### errorHandlers?

> `optional` **errorHandlers**: [`ErrorHandlerMap`](ErrorHandlerMap.md)\<`ErrorHandler`\>

Defined in: [packages/api/src/middleware/handle-error.ts:106](https://github.com/Xunnamius/api-utils/blob/f86b6da3746432264ea1e1b00e1751b0fe171fe2/packages/api/src/middleware/handle-error.ts#L106)

A mapping of Error classes and the functions that handle them.
