[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [index](../README.md) / middlewareFactory

# Function: middlewareFactory()

## Call Signature

> **middlewareFactory**\<`Options`, `Heap`\>(`defaults`): [`MiddlewareFactorySignatureModern`](../../types/type-aliases/MiddlewareFactorySignatureModern.md)\<`Options`, `Heap`\>

Defined in: [packages/api/src/index.ts:659](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/index.ts#L659)

Returns a _modern_ [withMiddleware](withMiddleware.md) function decorated with a "default"
configuration.

The returned [withMiddleware](withMiddleware.md) function optionally accepts its usual
parameters, which will be appended onto the default arguments to
`middlewareFactory`. Note that passed option keys will override (via shallow
merge) their default counterparts.

This function is useful when you don't want to repeatedly import, configure,
and list a bunch of middleware every time you want to call
[withMiddleware](withMiddleware.md).

### Type Parameters

#### Options

`Options` *extends* `Record`\<`string`, `unknown`\> = `EmptyObject`

#### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\> = `Record`\<`PropertyKey`, `unknown`\>

### Parameters

#### defaults

`PickFactoriedOptions`\<[`WithMiddlewareOptions`](../../types/type-aliases/WithMiddlewareOptions.md)\<`Options`, `Heap`, [`ModernMiddleware`](../../types/type-aliases/ModernMiddleware.md)\<`Options`, `Heap`\>\>\>

### Returns

[`MiddlewareFactorySignatureModern`](../../types/type-aliases/MiddlewareFactorySignatureModern.md)\<`Options`, `Heap`\>

## Call Signature

> **middlewareFactory**\<`Options`, `Heap`\>(`defaults`): [`MiddlewareFactorySignatureLegacy`](../../types/type-aliases/MiddlewareFactorySignatureLegacy.md)\<`Options`, `Heap`\>

Defined in: [packages/api/src/index.ts:679](https://github.com/Xunnamius/api-utils/blob/8b4c1ce3e472c5937dd3f59fd10531a01373b8ce/packages/api/src/index.ts#L679)

Returns a _legacy_ [withMiddleware](withMiddleware.md) function decorated with a "default"
configuration.

The returned [withMiddleware](withMiddleware.md) function optionally accepts its usual
parameters, which will be appended onto the default arguments to
`middlewareFactory`. Note that passed option keys will override (via shallow
merge) their default counterparts.

This function is useful when you don't want to repeatedly import, configure, and list a bunch
of middleware every time you want to call [withMiddleware](withMiddleware.md).

### Type Parameters

#### Options

`Options` *extends* `Record`\<`string`, `unknown`\> = `EmptyObject`

#### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\> = `Record`\<`PropertyKey`, `unknown`\>

### Parameters

#### defaults

`PickFactoriedOptions`\<[`WithMiddlewareOptions`](../../types/type-aliases/WithMiddlewareOptions.md)\<`Options`, `Heap`, [`LegacyMiddleware`](../../types/type-aliases/LegacyMiddleware.md)\<`Options`, `Heap`\>\>\>

### Returns

[`MiddlewareFactorySignatureLegacy`](../../types/type-aliases/MiddlewareFactorySignatureLegacy.md)\<`Options`, `Heap`\>
