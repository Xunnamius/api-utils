[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / SafePublicAuthEntry

# Type Alias: SafePublicAuthEntry

> **SafePublicAuthEntry** = `Omit`\<[`PublicAuthEntry`](PublicAuthEntry.md), `"token"`\>

Defined in: [packages/api-strategy/src/auth/types.ts:159](https://github.com/Xunnamius/api-utils/blob/3905fc4975c9f15e022202427b124cf715fcf3dc/packages/api-strategy/src/auth/types.ts#L159)

A version of  that excludes `token`, making it "safe" to reveal this
data structure publicly (e.g. in logs and other output).
