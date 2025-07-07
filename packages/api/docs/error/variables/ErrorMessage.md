[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [error](../README.md) / ErrorMessage

# Variable: ErrorMessage

> `const` **ErrorMessage**: `object`

Defined in: [packages/api/src/error.ts:5](https://github.com/Xunnamius/api-utils/blob/26ff5418e5bdc48556430bd75dc6bad0dc96e47c/packages/api/src/error.ts#L5)

A collection of possible error and warning messages.

## Type declaration

### AllClientsLockedOut()

> **AllClientsLockedOut**(): `string`

#### Returns

`string`

### BadContentType()

> **BadContentType**(`contentType`, `method`): `string`

#### Parameters

##### contentType

`undefined` | `null` | `string`

##### method

`undefined` | `string`

#### Returns

`string`

### CannotHandleContentType()

> **CannotHandleContentType**(): `string`

#### Returns

`string`

### InvalidAllowedContentTypes()

> **InvalidAllowedContentTypes**(): `string`

#### Returns

`string`

### InvalidOptionInMiddlewareConfig()

> **InvalidOptionInMiddlewareConfig**(`option`): `string`

#### Parameters

##### option

`string`

#### Returns

`string`

### LegacyMiddlewareApiNotSupported()

> **LegacyMiddlewareApiNotSupported**(): `string`

#### Returns

`string`

### MethodIsUndefined()

> **MethodIsUndefined**(): `string`

#### Returns

`string`

### ModernMiddlewareApiNotSupported()

> **ModernMiddlewareApiNotSupported**(): `string`

#### Returns

`string`

### MustDisableBodyParser()

> **MustDisableBodyParser**(): `string`

#### Returns

`string`

### ReachedEndOfRuntime()

> **ReachedEndOfRuntime**(): `string`

#### Returns

`string`

### RuntimeDoAfterHandledCalledTooLate()

> **RuntimeDoAfterHandledCalledTooLate**(): `string`

#### Returns

`string`

### RuntimeDoAfterSentCalledTooLate()

> **RuntimeDoAfterSentCalledTooLate**(): `string`

#### Returns

`string`

### RuntimeDoneCalledTooEarly()

> **RuntimeDoneCalledTooEarly**(): `string`

#### Returns

`string`

### RuntimeDoneCalledTooLate()

> **RuntimeDoneCalledTooLate**(): `string`

#### Returns

`string`

### SanityCheckFailed()

> **SanityCheckFailed**(): `string`

#### Returns

`string`

### UnexpectedPropertyCollision()

> **UnexpectedPropertyCollision**(): `string`

#### Returns

`string`
