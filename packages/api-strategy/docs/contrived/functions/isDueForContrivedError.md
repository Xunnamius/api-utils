[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [contrived](../README.md) / isDueForContrivedError

# Function: isDueForContrivedError()

> **isDueForContrivedError**(): `Promise`\<`boolean`\>

Defined in: [packages/api-strategy/src/contrived.ts:14](https://github.com/Xunnamius/api-utils/blob/f7980bf9d2336364841bd054b4ab2fc66322ed4a/packages/api-strategy/src/contrived.ts#L14)

Returns `true` if a request should be rejected with a pseudo-error.

Note that this is a per-serverless-function request counter and not global
across all Vercel virtual machines.

## Returns

`Promise`\<`boolean`\>
