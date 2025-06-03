[**@-xun/next-env**](../../README.md)

***

[@-xun/next-env](../../README.md) / [index](../README.md) / getEnv

# Function: getEnv()

> **getEnv**\<`T`\>(`customizedEnv?`): `object` & `T`

Defined in: [index.ts:33](https://github.com/Xunnamius/react-utils/blob/1f41a709ea64f9e7c32e353711451214fa86d1a1/packages/next-env/src/index.ts#L33)

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
