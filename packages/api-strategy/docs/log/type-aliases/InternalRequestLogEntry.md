[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [log](../README.md) / InternalRequestLogEntry

# Type Alias: InternalRequestLogEntry

> **InternalRequestLogEntry** = `WithId`\<\{ `createdAt`: `UnixEpochMs`; `durationMs`: `number`; `endpoint`: `string` \| `null`; `header`: `string` \| `null`; `ip`: `string` \| `null`; `method`: `string` \| `null`; `resStatusCode`: `HttpStatusCode`; `route`: `string` \| `null`; \}\>

Defined in: [packages/api-strategy/src/log.ts:18](https://github.com/Xunnamius/api-utils/blob/80abd4a35bc71883d21e2018ef2b5a215a9a56b3/packages/api-strategy/src/log.ts#L18)

The shape of an entry in the well-known "request log" collection.
