[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernApiHandler

# Type Alias: ModernApiHandler()

> **ModernApiHandler** = (`request`) => `Promisable`\<`Response` \| `undefined` \| `void`\>

Defined in: [packages/api/src/types.ts:31](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/types.ts#L31)

The shape of a modern fetch request handler.

Note that returning a Response instance will immediately send a
response and end the middleware execution chain. To prevent the chain from
ending, do not return a Response. To edit the current response in
passing, see the `runtime.response` property of [MiddlewareContext](MiddlewareContext.md).

## Parameters

### request

`Request`

## Returns

`Promisable`\<`Response` \| `undefined` \| `void`\>
