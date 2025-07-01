[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [limit](../README.md) / removeRateLimit

# Function: removeRateLimit()

## Call Signature

> **removeRateLimit**(`options`): `Promise`\<`number`\>

Defined in: [limit.ts:67](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/limit.ts#L67)

Removes a rate limit on a client matched against either `ip`, `header`, or
both. Matching against both removes rate limits that match either criterion.

### Parameters

#### options

##### target

`undefined` \| \{ `header?`: `string`; `ip`: `undefined` \| `string`; \}

### Returns

`Promise`\<`number`\>

The number of rate limits removed.

## Call Signature

> **removeRateLimit**(`options`): `Promise`\<`number`\>

Defined in: [limit.ts:70](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/limit.ts#L70)

Removes a rate limit on a client matched against either `ip`, `header`, or
both. Matching against both removes rate limits that match either criterion.

### Parameters

#### options

##### target

`undefined` \| \{ `header`: `undefined` \| `string`; `ip?`: `string`; \}

### Returns

`Promise`\<`number`\>

The number of rate limits removed.

## Call Signature

> **removeRateLimit**(`__namedParameters`): `Promise`\<`number`\>

Defined in: [limit.ts:73](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/limit.ts#L73)

Removes a rate limit on a client matched against either `ip`, `header`, or
both. Matching against both removes rate limits that match either criterion.

### Parameters

#### \_\_namedParameters

##### target

`undefined` \| \{ `header?`: `string`; `ip`: `undefined` \| `string`; \} \| \{ `header`: `undefined` \| `string`; `ip?`: `string`; \}

### Returns

`Promise`\<`number`\>

The number of rate limits removed.
