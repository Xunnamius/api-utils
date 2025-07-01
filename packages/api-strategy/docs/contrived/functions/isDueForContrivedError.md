[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [contrived](../README.md) / isDueForContrivedError

# Function: isDueForContrivedError()

> **isDueForContrivedError**(): `Promise`\<`boolean`\>

Defined in: [contrived.ts:14](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/contrived.ts#L14)

Returns `true` if a request should be rejected with a pseudo-error.

Note that this is a per-serverless-function request counter and not global
across all Vercel virtual machines.

## Returns

`Promise`\<`boolean`\>
