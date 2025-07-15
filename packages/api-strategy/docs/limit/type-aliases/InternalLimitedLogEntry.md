[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [limit](../README.md) / InternalLimitedLogEntry

# Type Alias: InternalLimitedLogEntry

> **InternalLimitedLogEntry** = `WithId`\<\{ `header?`: `never`; `ip`: `string`; `until`: `UnixEpochMs`; \} \| \{ `header`: `string`; `ip?`: `never`; `until`: `UnixEpochMs`; \}\>

Defined in: [packages/api-strategy/src/limit.ts:19](https://github.com/Xunnamius/api-utils/blob/f7980bf9d2336364841bd054b4ab2fc66322ed4a/packages/api-strategy/src/limit.ts#L19)

The shape of an entry in the well-known "limited log" collection.
