[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [log](../README.md) / InternalRequestLogEntry

# Type Alias: InternalRequestLogEntry

> **InternalRequestLogEntry** = `WithId`\<\{ `createdAt`: `UnixEpochMs`; `durationMs`: `number`; `endpoint`: `string` \| `null`; `header`: `string` \| `null`; `ip`: `string` \| `null`; `method`: `string` \| `null`; `resStatusCode`: `HttpStatusCode`; `route`: `string` \| `null`; \}\>

Defined in: [packages/api-strategy/src/log.ts:18](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api-strategy/src/log.ts#L18)

The shape of an entry in the well-known "request log" collection.
