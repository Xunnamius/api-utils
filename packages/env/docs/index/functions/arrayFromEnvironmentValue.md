[**@-xun/env**](../../README.md)

***

[@-xun/env](../../README.md) / [index](../README.md) / arrayFromEnvironmentValue

# Function: arrayFromEnvironmentValue()

> **arrayFromEnvironmentValue**(`envVal`): `string`[]

Defined in: [index.ts:19](https://github.com/Xunnamius/api-utils/blob/1146a0250eaddce3e84badee30d0a7461611f0bd/packages/env/src/index.ts#L19)

This method takes an environment variable value (string), removes illegal
characters, and then splits the string by its commas, returning the resulting
array with all nullish members filtered out.

## Parameters

### envVal

`string`

## Returns

`string`[]
