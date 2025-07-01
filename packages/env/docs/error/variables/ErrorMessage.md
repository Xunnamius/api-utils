[**@-xun/env**](../../README.md)

***

[@-xun/env](../../README.md) / [error](../README.md) / ErrorMessage

# Variable: ErrorMessage

> `const` **ErrorMessage**: `object`

Defined in: [error.ts:5](https://github.com/Xunnamius/api-utils/blob/456446b4534927cfeb9885c7da86d1ef93236276/packages/env/src/error.ts#L5)

A collection of possible error and warning messages.

## Type declaration

### BadMongoMsPort()

> **BadMongoMsPort**(): `string`

#### Returns

`string`

### BadValue()

> **BadValue**(`name`, `value`, `reason`): `string`

#### Parameters

##### name

`string`

##### value

`unknown`

##### reason

`string`

#### Returns

`string`

### BadVariables()

> **BadVariables**(`errors`): `string`

#### Parameters

##### errors

`string`[]

#### Returns

`string`

### UnexpectedEmptyOrMissing()

> **UnexpectedEmptyOrMissing**(`name`, `value`): `string`

#### Parameters

##### name

`string`

##### value

`unknown`

#### Returns

`string`

### UnexpectedNegativeNumber()

> **UnexpectedNegativeNumber**(`name`, `value`): `string`

#### Parameters

##### name

`string`

##### value

`unknown`

#### Returns

`string`

### UnknownHttpMethod()

> **UnknownHttpMethod**(`method`, `validHttpMethods`): `string`

#### Parameters

##### method

`string`

##### validHttpMethods

readonly `string`[]

#### Returns

`string`
