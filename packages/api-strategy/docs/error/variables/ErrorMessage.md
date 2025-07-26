[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [error](../README.md) / ErrorMessage

# Variable: ErrorMessage

> `const` **ErrorMessage**: `object`

Defined in: [packages/api-strategy/src/error.ts:5](https://github.com/Xunnamius/api-utils/blob/52a8c73e7bc88df6639a2fe1c2313f726aa468a9/packages/api-strategy/src/error.ts#L5)

A collection of possible error and warning messages.

## Type declaration

### GuruMeditation()

> **GuruMeditation**: () => `string`

#### Returns

`string`

### AliasedDatabaseNotAliasable()

> **AliasedDatabaseNotAliasable**(`actual`, `alias`, `actualDatabaseNames`): `string`

#### Parameters

##### actual

`string`

##### alias

`string`

##### actualDatabaseNames

`string`[]

#### Returns

`string`

### AuthAttemptFailed()

> **AuthAttemptFailed**(): `string`

#### Returns

`string`

### InvalidDatabaseAlias()

> **InvalidDatabaseAlias**(`actual`, `alias`): `string`

#### Parameters

##### actual

`string`

##### alias

`string`

#### Returns

`string`

### InvalidEmptyHeader()

> **InvalidEmptyHeader**(): `string`

#### Returns

`string`

### InvalidEmptyIp()

> **InvalidEmptyIp**(): `string`

#### Returns

`string`

### NeedsEitherIpOrHeader()

> **NeedsEitherIpOrHeader**(): `string`

#### Returns

`string`

### TokenCollision()

> **TokenCollision**(): `string`

#### Returns

`string`
