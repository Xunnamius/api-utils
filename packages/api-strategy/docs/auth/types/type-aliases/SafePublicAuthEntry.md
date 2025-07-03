[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/types](../README.md) / SafePublicAuthEntry

# Type Alias: SafePublicAuthEntry

> **SafePublicAuthEntry** = `Omit`\<[`PublicAuthEntry`](PublicAuthEntry.md), `"token"`\>

Defined in: [packages/api-strategy/src/auth/types.ts:163](https://github.com/Xunnamius/api-utils/blob/51ed4560620e631b81b4890e48c56dab5e8d6449/packages/api-strategy/src/auth/types.ts#L163)

A version of  that excludes `token`, making it "safe" to reveal this
data structure publicly (e.g. in logs and other output).
