[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / Options

# Type Alias: Options\<ErrorHandler\>

> **Options**\<`ErrorHandler`\> = `object`

Defined in: [packages/api/src/middleware/handle-error.ts:97](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/middleware/handle-error.ts#L97)

## Type Parameters

### ErrorHandler

`ErrorHandler` *extends* [`ModernErrorHandler`](ModernErrorHandler.md)\<`any`, `any`\> \| [`LegacyErrorHandler`](LegacyErrorHandler.md)\<`any`, `any`\>

## Properties

### errorHandlers?

> `optional` **errorHandlers**: \[`NoInfer`\<(...`args`) => `Error`\>, `UnwrapTagged`\<`NoInfer`\<`ErrorHandler`\>\>\][]

Defined in: [packages/api/src/middleware/handle-error.ts:104](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/middleware/handle-error.ts#L104)

A map (in the form of a multidimensional array) of Error classes and the
functions that handle them.
