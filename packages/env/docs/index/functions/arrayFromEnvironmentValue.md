[**@-xun/env**](../../README.md)

***

[@-xun/env](../../README.md) / [index](../README.md) / arrayFromEnvironmentValue

# Function: arrayFromEnvironmentValue()

> **arrayFromEnvironmentValue**(`envVal`): `string`[]

Defined in: [index.ts:17](https://github.com/Xunnamius/api-utils/blob/0b7c09badb430143839c51ee6ae32dc6d1082533/packages/env/src/index.ts#L17)

This method takes an environment variable value (string), removes illegal
characters, and then splits the string by its commas, returning the resulting
array with all nullish members filtered out.

## Parameters

### envVal

`string`

## Returns

`string`[]
