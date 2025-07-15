[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [log](../README.md) / InternalRequestLogEntry

# Type Alias: InternalRequestLogEntry

> **InternalRequestLogEntry** = `WithId`\<\{ `createdAt`: `UnixEpochMs`; `durationMs`: `number`; `endpoint`: `string` \| `null`; `header`: `string` \| `null`; `ip`: `string` \| `null`; `method`: `string` \| `null`; `resStatusCode`: `HttpStatusCode`; `route`: `string` \| `null`; \}\>

Defined in: [packages/api-strategy/src/log.ts:22](https://github.com/Xunnamius/api-utils/blob/60a2178cffe0885ecc2a390e9b6bc795373b5e0b/packages/api-strategy/src/log.ts#L22)

The shape of an entry in the well-known "request log" collection.
