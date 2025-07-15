[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernApiHandler

# Type Alias: ModernApiHandler

> **ModernApiHandler** = (`request`) => `Promisable`\<`Response` \| `undefined` \| `void`\> & `{ [method in ValidHttpMethod]?: Extract<ModernApiHandler, Function> }`

Defined in: [packages/api/src/types.ts:31](https://github.com/Xunnamius/api-utils/blob/3e7489507eea9aa3d33b0bcc648e0389bef6f3f5/packages/api/src/types.ts#L31)

The shape of a modern fetch request handler.

Note that returning a Response instance will immediately send a
response and end the middleware execution chain. To prevent the chain from
ending, do not return a Response. To edit the current response in
passing, see the `runtime.response` property of [MiddlewareContext](MiddlewareContext.md).
