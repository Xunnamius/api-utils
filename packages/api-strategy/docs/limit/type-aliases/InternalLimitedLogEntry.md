[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [limit](../README.md) / InternalLimitedLogEntry

# Type Alias: InternalLimitedLogEntry

> **InternalLimitedLogEntry** = `WithId`\<\{ `header?`: `never`; `ip`: `string`; `until`: `UnixEpochMs`; \} \| \{ `header`: `string`; `ip?`: `never`; `until`: `UnixEpochMs`; \}\>

Defined in: [limit.ts:14](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/limit.ts#L14)

The shape of an entry in the well-known "limited log" collection.
