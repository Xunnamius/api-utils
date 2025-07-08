[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / Options

# Type Alias: Options\<ErrorHandler\>

> **Options**\<`ErrorHandler`\> = `object`

Defined in: [packages/api/src/middleware/handle-error.ts:98](https://github.com/Xunnamius/api-utils/blob/f159b4026fbac8d4de769d2a9e8cfaddf85d9e96/packages/api/src/middleware/handle-error.ts#L98)

## Type Parameters

### ErrorHandler

`ErrorHandler` *extends* [`ModernErrorHandler`](ModernErrorHandler.md)\<`any`, `any`\> \| [`LegacyErrorHandler`](LegacyErrorHandler.md)\<`any`, `any`\>

## Properties

### errorHandlers?

> `optional` **errorHandlers**: \[(...`args`) => `Error`, `UnwrapTagged`\<`ErrorHandler`\>\][]

Defined in: [packages/api/src/middleware/handle-error.ts:105](https://github.com/Xunnamius/api-utils/blob/f159b4026fbac8d4de769d2a9e8cfaddf85d9e96/packages/api/src/middleware/handle-error.ts#L105)

A map (in the form of a multidimensional array) of Error classes and the
functions that handle them.
