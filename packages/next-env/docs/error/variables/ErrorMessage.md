[**@-xun/next-env**](../../README.md)

***

[@-xun/next-env](../../README.md) / [error](../README.md) / ErrorMessage

# Variable: ErrorMessage

> `const` **ErrorMessage**: `object`

Defined in: [error.ts:5](https://github.com/Xunnamius/react-utils/blob/84547fe8d5f66a2fb908cd35a9aeb4b422bd1c6c/packages/next-env/src/error.ts#L5)

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
