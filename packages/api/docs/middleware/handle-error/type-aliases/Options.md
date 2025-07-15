[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/handle-error](../README.md) / Options

# Type Alias: Options\<ErrorHandler\>

> **Options**\<`ErrorHandler`\> = `object`

Defined in: [packages/api/src/middleware/handle-error.ts:99](https://github.com/Xunnamius/api-utils/blob/e344f26c2c71ff2ab26a4bf6ee6f0fc1cb9a441b/packages/api/src/middleware/handle-error.ts#L99)

## Type Parameters

### ErrorHandler

`ErrorHandler` *extends* [`ModernErrorHandler`](ModernErrorHandler.md)\<`any`, `any`\> \| [`LegacyErrorHandler`](LegacyErrorHandler.md)\<`any`, `any`\>

## Properties

### errorHandlers?

> `optional` **errorHandlers**: \[(...`args`) => `Error`, `UnwrapTagged`\<`ErrorHandler`\>\][]

Defined in: [packages/api/src/middleware/handle-error.ts:106](https://github.com/Xunnamius/api-utils/blob/e344f26c2c71ff2ab26a4bf6ee6f0fc1cb9a441b/packages/api/src/middleware/handle-error.ts#L106)

A map (in the form of a multidimensional array) of Error classes and the
functions that handle them.
