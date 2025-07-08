[**@-xun/api-error**](../README.md)

***

[@-xun/api-error](../README.md) / isANamedErrorClass

# Function: isANamedErrorClass()

> **isANamedErrorClass**(`parameter`): `parameter is AnyErrorClassConstructor & NamedErrorConstructorStaticProperties<Error>`

Defined in: node\_modules/@-xun/error/dist/src/index.d.ts:29

Returns `true` if `parameter` is an Error subclass (_not an
instance_) created using makeNamedError.

**This function is NOT for match instances, but actual classes extending
Error!**

## Parameters

### parameter

`unknown`

## Returns

`parameter is AnyErrorClassConstructor & NamedErrorConstructorStaticProperties<Error>`
