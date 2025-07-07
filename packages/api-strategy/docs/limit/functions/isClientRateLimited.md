[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [limit](../README.md) / isClientRateLimited

# Function: isClientRateLimited()

## Call Signature

> **isClientRateLimited**(`request`): `Promise`\<[`IsClientRateLimitedReturnType`](../type-aliases/IsClientRateLimitedReturnType.md)\>

Defined in: [packages/api-strategy/src/limit.ts:50](https://github.com/Xunnamius/api-utils/blob/9ad17e4ad2e689dd2955c28701b11d077ae09346/packages/api-strategy/src/limit.ts#L50)

Returns an object with two keys: `isLimited` and `retryAfter`. If `isLimited`
is true, then the request should be rejected. The client should be instructed
to retry their request after `retryAfter` milliseconds have passed.

### Parameters

#### request

`Request`

### Returns

`Promise`\<[`IsClientRateLimitedReturnType`](../type-aliases/IsClientRateLimitedReturnType.md)\>

## Call Signature

> **isClientRateLimited**(`req`): `Promise`\<[`IsClientRateLimitedReturnType`](../type-aliases/IsClientRateLimitedReturnType.md)\>

Defined in: [packages/api-strategy/src/limit.ts:53](https://github.com/Xunnamius/api-utils/blob/9ad17e4ad2e689dd2955c28701b11d077ae09346/packages/api-strategy/src/limit.ts#L53)

Returns an object with two keys: `isLimited` and `retryAfter`. If `isLimited`
is true, then the request should be rejected. The client should be instructed
to retry their request after `retryAfter` milliseconds have passed.

### Parameters

#### req

`NextApiRequestLike`

### Returns

`Promise`\<[`IsClientRateLimitedReturnType`](../type-aliases/IsClientRateLimitedReturnType.md)\>

## Call Signature

> **isClientRateLimited**(`reqOrRequest`): `Promise`\<[`IsClientRateLimitedReturnType`](../type-aliases/IsClientRateLimitedReturnType.md)\>

Defined in: [packages/api-strategy/src/limit.ts:56](https://github.com/Xunnamius/api-utils/blob/9ad17e4ad2e689dd2955c28701b11d077ae09346/packages/api-strategy/src/limit.ts#L56)

Returns an object with two keys: `isLimited` and `retryAfter`. If `isLimited`
is true, then the request should be rejected. The client should be instructed
to retry their request after `retryAfter` milliseconds have passed.

### Parameters

#### reqOrRequest

`NextApiRequestLike` | `Request`

### Returns

`Promise`\<[`IsClientRateLimitedReturnType`](../type-aliases/IsClientRateLimitedReturnType.md)\>
