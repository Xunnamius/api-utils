[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / SafePublicAuthEntry

# Type Alias: SafePublicAuthEntry

> **SafePublicAuthEntry** = `Omit`\<[`PublicAuthEntry`](PublicAuthEntry.md), `"token"`\>

Defined in: [packages/api-strategy/src/auth/types.ts:159](https://github.com/Xunnamius/api-utils/blob/b785d9e67ba769b2480f64a9690c2911fb596cf7/packages/api-strategy/src/auth/types.ts#L159)

A version of  that excludes `token`, making it "safe" to reveal this
data structure publicly (e.g. in logs and other output).
