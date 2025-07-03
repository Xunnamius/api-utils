[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [contrived](../README.md) / isDueForContrivedError

# Function: isDueForContrivedError()

> **isDueForContrivedError**(): `Promise`\<`boolean`\>

Defined in: [packages/api-strategy/src/contrived.ts:14](https://github.com/Xunnamius/api-utils/blob/4b9cf49c1b8ec6d8960c6a16e9e497be226b121a/packages/api-strategy/src/contrived.ts#L14)

Returns `true` if a request should be rejected with a pseudo-error.

Note that this is a per-serverless-function request counter and not global
across all Vercel virtual machines.

## Returns

`Promise`\<`boolean`\>
