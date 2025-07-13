[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ExportedMiddleware

# Type Alias: ExportedMiddleware()\<Options, Heap\>

> **ExportedMiddleware**\<`Options`, `Heap`\> = (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext?`) => `Promisable`\<`Response` \| `undefined` \| `void`\>

Defined in: [packages/api/src/types.ts:127](https://github.com/Xunnamius/api-utils/blob/60863c4db4ba817b2926c481da6a42f07a7c9992/packages/api/src/types.ts#L127)

The shape of the return type of a middleware function exported by a file
under the `middleware/` directory. Supports both the legacy and modern
middleware interfaces simultaneously (hence the awkward parameterization).

This type if meant for end-users and isn't used internally by the library.

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\> = `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### reqOrRequest

[`NextApiRequestLike`](../../index/interfaces/NextApiRequestLike.md) | `Request`

### resOrModernContext

[`NextApiResponseLike`](../../index/type-aliases/NextApiResponseLike.md) | [`ModernMiddlewareContext`](ModernMiddlewareContext.md)\<`Options`, `Heap`\>

### maybeLegacyContext?

[`LegacyMiddlewareContext`](LegacyMiddlewareContext.md)\<`Options`, `Heap`\>

## Returns

`Promisable`\<`Response` \| `undefined` \| `void`\>
