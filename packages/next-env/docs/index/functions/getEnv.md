[**@-xun/next-env**](../../README.md)

***

[@-xun/next-env](../../README.md) / [index](../README.md) / getEnv

# Function: getEnv()

> **getEnv**\<`T`\>(`customizedEnv?`): `object` & `T`

Defined in: [index.ts:33](https://github.com/Xunnamius/react-utils/blob/b1b45cf09cd5af6593920ea281ef27f4c3efd32f/packages/next-env/src/index.ts#L33)

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
