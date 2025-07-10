[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / SafePublicAuthEntry

# Type Alias: SafePublicAuthEntry

> **SafePublicAuthEntry** = `Omit`\<[`PublicAuthEntry`](PublicAuthEntry.md), `"token"`\>

Defined in: [packages/api-strategy/src/auth/types.ts:159](https://github.com/Xunnamius/api-utils/blob/ee7740d17f3fcf19933c048d9a79c5c0520267a8/packages/api-strategy/src/auth/types.ts#L159)

A version of  that excludes `token`, making it "safe" to reveal this
data structure publicly (e.g. in logs and other output).
