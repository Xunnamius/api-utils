[**@-xun/env**](../../README.md)

***

[@-xun/env](../../README.md) / [index](../README.md) / getEnv

# Function: getEnv()

> **getEnv**\<`T`\>(`customizedEnv?`): `object` & `T`

Defined in: [index.ts:31](https://github.com/Xunnamius/api-utils/blob/6c4d0a6c6dd75cf70a61cf5e13f3a0671a3583aa/packages/env/src/index.ts#L31)

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
