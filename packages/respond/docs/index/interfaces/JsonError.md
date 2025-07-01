[**@-xun/respond**](../../README.md)

***

[@-xun/respond](../../README.md) / [index](../README.md) / JsonError

# Interface: JsonError

Defined in: [index.ts:39](https://github.com/Xunnamius/api-utils/blob/de39eacf7b1e97617a2035eff33c6efaf5ffb215/packages/respond/src/index.ts#L39)

Generic failure JSON result object. May contain any number of additional
jsonifiable key-value pairs.

## Extends

- `JsonObject`

## Indexable

\[`key`: `string`\]: `null` \| (string \| number \| boolean \| JsonObject \| JsonValue\[\] \| readonly JsonValue\[\]) & (string \| number \| boolean \| JsonObject \| JsonValue\[\] \| readonly JsonValue\[\] \| undefined)

## Properties

### error

> **error**: `string`

Defined in: [index.ts:40](https://github.com/Xunnamius/api-utils/blob/de39eacf7b1e97617a2035eff33c6efaf5ffb215/packages/respond/src/index.ts#L40)

***

### success

> **success**: `false`

Defined in: [index.ts:41](https://github.com/Xunnamius/api-utils/blob/de39eacf7b1e97617a2035eff33c6efaf5ffb215/packages/respond/src/index.ts#L41)
