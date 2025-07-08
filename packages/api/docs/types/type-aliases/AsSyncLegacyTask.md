[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / AsSyncLegacyTask

# Type Alias: AsSyncLegacyTask\<Middleware\>

> **AsSyncLegacyTask**\<`Middleware`\> = `SetReturnType`\<`UnwrapTagged`\<`Middleware`\>, `Awaited`\<`ReturnType`\<`Middleware`\>\>\>

Defined in: [packages/api/src/types.ts:109](https://github.com/Xunnamius/api-utils/blob/5d75eafe8fcae226a3b6f99a43817184692fd9bf/packages/api/src/types.ts#L109)

This type exists for the benefit of legacy middleware.

## Type Parameters

### Middleware

`Middleware` *extends* [`LegacyMiddleware`](LegacyMiddleware.md)\<`any`, `any`\>
