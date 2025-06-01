[**@-xun/next-env**](../../README.md)

***

[@-xun/next-env](../../README.md) / [index](../README.md) / getEnv

# Function: getEnv()

> **getEnv**\<`T`\>(`customizedEnv?`): `object` & `T`

Defined in: [index.ts:33](https://github.com/Xunnamius/react-utils/blob/84547fe8d5f66a2fb908cd35a9aeb4b422bd1c6c/packages/next-env/src/index.ts#L33)

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
