[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / AnyMiddleware

# Type Alias: AnyMiddleware\<Options, Heap\>

> **AnyMiddleware**\<`Options`, `Heap`\> = [`ModernMiddleware`](ModernMiddleware.md)\<`Options`, `any`, `any`, `Heap`\> \| [`LegacyMiddleware`](LegacyMiddleware.md)\<`Options`, `any`, `any`, `Heap`\>

Defined in: [packages/api/src/types.ts:148](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L148)

The union of [ModernMiddleware](ModernMiddleware.md) and [LegacyMiddleware](LegacyMiddleware.md) that allow
any request/response shape.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>
