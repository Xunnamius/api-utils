[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [contrived](../README.md) / isDueForContrivedError

# Function: isDueForContrivedError()

> **isDueForContrivedError**(): `Promise`\<`boolean`\>

Defined in: [packages/api-strategy/src/contrived.ts:14](https://github.com/Xunnamius/api-utils/blob/ee7740d17f3fcf19933c048d9a79c5c0520267a8/packages/api-strategy/src/contrived.ts#L14)

Returns `true` if a request should be rejected with a pseudo-error.

Note that this is a per-serverless-function request counter and not global
across all Vercel virtual machines.

## Returns

`Promise`\<`boolean`\>
