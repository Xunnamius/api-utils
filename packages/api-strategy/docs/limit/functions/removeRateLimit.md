[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [limit](../README.md) / removeRateLimit

# Function: removeRateLimit()

## Call Signature

> **removeRateLimit**(`options`): `Promise`\<`number`\>

Defined in: [packages/api-strategy/src/limit.ts:97](https://github.com/Xunnamius/api-utils/blob/4b9cf49c1b8ec6d8960c6a16e9e497be226b121a/packages/api-strategy/src/limit.ts#L97)

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

Defined in: [packages/api-strategy/src/limit.ts:100](https://github.com/Xunnamius/api-utils/blob/4b9cf49c1b8ec6d8960c6a16e9e497be226b121a/packages/api-strategy/src/limit.ts#L100)

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

Defined in: [packages/api-strategy/src/limit.ts:103](https://github.com/Xunnamius/api-utils/blob/4b9cf49c1b8ec6d8960c6a16e9e497be226b121a/packages/api-strategy/src/limit.ts#L103)

Removes a rate limit on a client matched against either `ip`, `header`, or
both. Matching against both removes rate limits that match either criterion.

### Parameters

#### \_\_namedParameters

##### target

`undefined` \| \{ `header?`: `string`; `ip`: `undefined` \| `string`; \} \| \{ `header`: `undefined` \| `string`; `ip?`: `string`; \}

### Returns

`Promise`\<`number`\>

The number of rate limits removed.
