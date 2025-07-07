[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / FactoriedMiddlewareOptions

# Type Alias: FactoriedMiddlewareOptions\<Options, Heap, Middleware\>

> **FactoriedMiddlewareOptions**\<`Options`, `Heap`, `Middleware`\> = `Partial`\<`Omit`\<[`WithMiddlewareOptions`](WithMiddlewareOptions.md)\<`Options`, `Heap`, `Middleware`\>, `"use"` \| `"useOnError"` \| `"options"`\>\> & `object` & `object`

Defined in: [packages/api/src/types.ts:401](https://github.com/Xunnamius/api-utils/blob/26ff5418e5bdc48556430bd75dc6bad0dc96e47c/packages/api/src/types.ts#L401)

middlewareFactory

## Type declaration

### options?

> `optional` **options**: `Merge`\<[`WithMiddlewareOptions`](WithMiddlewareOptions.md)\<`Options`, `Heap`, `Middleware`\>\[`"options"`\], \{ `legacyMode?`: `boolean`; \}\>

## Type declaration

### appendUse?

> `optional` **appendUse**: [`ExportedMiddleware`](ExportedMiddleware.md)\<`any`, `any`\>[]

#### See

[WithMiddlewareOptions.use](WithMiddlewareOptions.md)

### appendUseOnError?

> `optional` **appendUseOnError**: [`ExportedMiddleware`](ExportedMiddleware.md)\<`any`, `any`\>[]

#### See

[WithMiddlewareOptions.useOnError](WithMiddlewareOptions.md)

### prependUse?

> `optional` **prependUse**: [`ExportedMiddleware`](ExportedMiddleware.md)\<`any`, `any`\>[]

#### See

[WithMiddlewareOptions.use](WithMiddlewareOptions.md)

### prependUseOnError?

> `optional` **prependUseOnError**: [`ExportedMiddleware`](ExportedMiddleware.md)\<`any`, `any`\>[]

#### See

[WithMiddlewareOptions.useOnError](WithMiddlewareOptions.md)

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

### Middleware

`Middleware` *extends* [`ModernOrLegacyMiddleware`](ModernOrLegacyMiddleware.md)\<`Options`, `Heap`\>
