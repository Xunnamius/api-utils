[**@-xun/respond**](../../README.md)

***

[@-xun/respond](../../README.md) / [index](../README.md) / JsonError

# Interface: JsonError

Defined in: [index.ts:39](https://github.com/Xunnamius/api-utils/blob/e8ce4963b8daa4c21bc4c8b9f74bbf11b683a0d4/packages/respond/src/index.ts#L39)

Generic failure JSON result object. May contain any number of additional
jsonifiable key-value pairs.

## Extends

- `JsonObject`

## Indexable

\[`key`: `string`\]: `null` \| (string \| number \| boolean \| JsonObject \| JsonValue\[\] \| readonly JsonValue\[\]) & (string \| number \| boolean \| JsonObject \| JsonValue\[\] \| readonly JsonValue\[\] \| undefined)

## Properties

### error

> **error**: `string`

Defined in: [index.ts:40](https://github.com/Xunnamius/api-utils/blob/e8ce4963b8daa4c21bc4c8b9f74bbf11b683a0d4/packages/respond/src/index.ts#L40)

***

### success

> **success**: `false`

Defined in: [index.ts:41](https://github.com/Xunnamius/api-utils/blob/e8ce4963b8daa4c21bc4c8b9f74bbf11b683a0d4/packages/respond/src/index.ts#L41)
