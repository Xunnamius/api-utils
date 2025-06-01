[**@-xun/next-env**](../../README.md)

***

[@-xun/next-env](../../README.md) / [index](../README.md) / arrayFromEnvironmentValue

# Function: arrayFromEnvironmentValue()

> **arrayFromEnvironmentValue**(`envVal`): `string`[]

Defined in: [index.ts:17](https://github.com/Xunnamius/react-utils/blob/84547fe8d5f66a2fb908cd35a9aeb4b422bd1c6c/packages/next-env/src/index.ts#L17)

This method takes an environment variable value (string), removes illegal
characters, and then splits the string by its commas, returning the resulting
array with all nullish members filtered out.

## Parameters

### envVal

`string`

## Returns

`string`[]
