[**@-xun/env**](../../README.md)

***

[@-xun/env](../../README.md) / [index](../README.md) / getEnv

# Function: getEnv()

> **getEnv**\<`T`\>(`customizedEnv?`): `object` & `T`

Defined in: [index.ts:35](https://github.com/Xunnamius/api-utils/blob/8611a80c32c84d869e6f8afad74bcf763a5b7d3b/packages/env/src/index.ts#L35)

Returns an object representing the current runtime environment. Performs
light validation.

Note that this method does not invoke dotenv or load any .env files or
otherwise affect `process.env`. The environment must be mutated manually.

## Type Parameters

### T

`T` *extends* [`Environment`](../type-aliases/Environment.md)

## Parameters

### customizedEnv?

`T`

## Returns

`object` & `T`
