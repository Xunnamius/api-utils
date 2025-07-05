[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernApiHandler

# Type Alias: ModernApiHandler()

> **ModernApiHandler** = (`request`) => `Promisable`\<`Response` \| `undefined` \| `void`\>

Defined in: [packages/api/src/types.ts:31](https://github.com/Xunnamius/api-utils/blob/f86b6da3746432264ea1e1b00e1751b0fe171fe2/packages/api/src/types.ts#L31)

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
