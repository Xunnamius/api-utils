[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [limit](../README.md) / InternalLimitedLogEntry

# Type Alias: InternalLimitedLogEntry

> **InternalLimitedLogEntry** = `WithId`\<\{ `header?`: `never`; `ip`: `string`; `until`: `UnixEpochMs`; \} \| \{ `header`: `string`; `ip?`: `never`; `until`: `UnixEpochMs`; \}\>

Defined in: [packages/api-strategy/src/limit.ts:19](https://github.com/Xunnamius/api-utils/blob/60a2178cffe0885ecc2a390e9b6bc795373b5e0b/packages/api-strategy/src/limit.ts#L19)

The shape of an entry in the well-known "limited log" collection.
