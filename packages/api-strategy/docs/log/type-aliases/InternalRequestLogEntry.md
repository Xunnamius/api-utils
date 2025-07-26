[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [log](../README.md) / InternalRequestLogEntry

# Type Alias: InternalRequestLogEntry

> **InternalRequestLogEntry** = `WithId`\<\{ `createdAt`: `UnixEpochMs`; `durationMs`: `number`; `endpoint`: `string` \| `null`; `header`: `string` \| `null`; `ip`: `string` \| `null`; `method`: `string` \| `null`; `resStatusCode`: `HttpStatusCode`; `route`: `string` \| `null`; \}\>

Defined in: [packages/api-strategy/src/log.ts:22](https://github.com/Xunnamius/api-utils/blob/52a8c73e7bc88df6639a2fe1c2313f726aa468a9/packages/api-strategy/src/log.ts#L22)

The shape of an entry in the well-known "request log" collection.
