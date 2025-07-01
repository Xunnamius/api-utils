[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [limit](../README.md) / isClientRateLimited

# Function: isClientRateLimited()

> **isClientRateLimited**(`req`): `Promise`\<\{ `isLimited`: `boolean`; `retryAfter`: `number`; \}\>

Defined in: [limit.ts:37](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/limit.ts#L37)

Returns an object with two keys: `isLimited` and `retryAfter`. If `isLimited`
is true, then the request should be rejected. The client should be instructed
to retry their request after `retryAfter` milliseconds have passed.

## Parameters

### req

`NextApiRequestLike`

## Returns

`Promise`\<\{ `isLimited`: `boolean`; `retryAfter`: `number`; \}\>
