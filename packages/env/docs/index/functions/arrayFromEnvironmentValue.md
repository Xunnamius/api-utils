[**@-xun/env**](../../README.md)

***

[@-xun/env](../../README.md) / [index](../README.md) / arrayFromEnvironmentValue

# Function: arrayFromEnvironmentValue()

> **arrayFromEnvironmentValue**(`envVal`): `string`[]

Defined in: [index.ts:15](https://github.com/Xunnamius/api-utils/blob/6c4d0a6c6dd75cf70a61cf5e13f3a0671a3583aa/packages/env/src/index.ts#L15)

This method takes an environment variable value (string), removes illegal
characters, and then splits the string by its commas, returning the resulting
array with all nullish members filtered out.

## Parameters

### envVal

`string`

## Returns

`string`[]
