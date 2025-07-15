[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / AsSyncLegacyTask

# Type Alias: AsSyncLegacyTask\<Middleware\>

> **AsSyncLegacyTask**\<`Middleware`\> = `SetReturnType`\<`UnwrapTagged`\<`Middleware`\>, `Awaited`\<`ReturnType`\<`Middleware`\>\>\>

Defined in: [packages/api/src/types.ts:109](https://github.com/Xunnamius/api-utils/blob/3e7489507eea9aa3d33b0bcc648e0389bef6f3f5/packages/api/src/types.ts#L109)

This type exists for the benefit of legacy middleware.

## Type Parameters

### Middleware

`Middleware` *extends* [`LegacyMiddleware`](LegacyMiddleware.md)\<`any`, `any`\>
