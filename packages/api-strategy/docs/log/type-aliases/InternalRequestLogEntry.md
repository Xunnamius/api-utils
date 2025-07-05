[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [log](../README.md) / InternalRequestLogEntry

# Type Alias: InternalRequestLogEntry

> **InternalRequestLogEntry** = `WithId`\<\{ `createdAt`: `UnixEpochMs`; `durationMs`: `number`; `endpoint`: `string` \| `null`; `header`: `string` \| `null`; `ip`: `string` \| `null`; `method`: `string` \| `null`; `resStatusCode`: `HttpStatusCode`; `route`: `string` \| `null`; \}\>

Defined in: [packages/api-strategy/src/log.ts:18](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/log.ts#L18)

The shape of an entry in the well-known "request log" collection.
