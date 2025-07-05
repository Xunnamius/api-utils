[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/db](../README.md) / tokenAttributesFilterToMongoFilter

# Function: tokenAttributesFilterToMongoFilter()

> **tokenAttributesFilterToMongoFilter**(`filter`): `object`

Defined in: [packages/api-strategy/src/auth/db.ts:79](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/auth/db.ts#L79)

Transforms `filter`, the token attributes filter, into a MongoDb update
filter with equivalent meaning.

Note that an `undefined` value for a boolean-accepting property will check
for non-existence only, while a `false` value will check for both falseness
(expected) but also non-existence too.

## Parameters

### filter

[`TokenAttributesFilter`](../../types/type-aliases/TokenAttributesFilter.md)

## Returns

`object`

#### attributes.isGlobalAdmin?

> `optional` **isGlobalAdmin**: `true` \| \{ `$in`: (`null` \| `boolean`)[]; \}

#### attributes.owner?

> `optional` **owner**: `object`

#### attributes.owner.$in

> **$in**: `string`[]

### deleted

> **deleted**: `boolean` = `false`
