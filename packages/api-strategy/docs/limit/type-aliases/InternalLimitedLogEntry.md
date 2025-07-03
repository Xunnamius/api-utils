[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [limit](../README.md) / InternalLimitedLogEntry

# Type Alias: InternalLimitedLogEntry

> **InternalLimitedLogEntry** = `WithId`\<\{ `header?`: `never`; `ip`: `string`; `until`: `UnixEpochMs`; \} \| \{ `header`: `string`; `ip?`: `never`; `until`: `UnixEpochMs`; \}\>

Defined in: [packages/api-strategy/src/limit.ts:19](https://github.com/Xunnamius/api-utils/blob/c4e96008fb8e0dd5fdfbead84f2e3657f2f0352f/packages/api-strategy/src/limit.ts#L19)

The shape of an entry in the well-known "limited log" collection.
