[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [index](../README.md) / middlewareFactory

# Function: middlewareFactory()

## Call Signature

> **middlewareFactory**\<`Options`, `RequestType`, `ResponseType`, `Heap`\>(`defaults`): [`MiddlewareFactorySignatureModern`](../../types/type-aliases/MiddlewareFactorySignatureModern.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>

Defined in: [packages/api/src/index.ts:570](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/index.ts#L570)

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

`Options` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

#### RequestType

`RequestType` *extends* `Request` = `Request`

#### ResponseType

`ResponseType` *extends* `Response` = `Response`

#### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\> = `Record`\<`PropertyKey`, `unknown`\>

### Parameters

#### defaults

`PickFactoriedOptions`\<[`WithMiddlewareOptions`](../../types/type-aliases/WithMiddlewareOptions.md)\<`Options`, `Heap`, [`ModernMiddleware`](../../types/type-aliases/ModernMiddleware.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>\>\>

### Returns

[`MiddlewareFactorySignatureModern`](../../types/type-aliases/MiddlewareFactorySignatureModern.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>

## Call Signature

> **middlewareFactory**\<`Options`, `RequestType`, `ResponseType`, `Heap`\>(`defaults`): [`MiddlewareFactorySignatureLegacy`](../../types/type-aliases/MiddlewareFactorySignatureLegacy.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>

Defined in: [packages/api/src/index.ts:596](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/index.ts#L596)

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

`Options` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

#### RequestType

`RequestType` *extends* [`NextApiRequestLike`](../interfaces/NextApiRequestLike.md) = [`NextApiRequestLike`](../interfaces/NextApiRequestLike.md)

#### ResponseType

`ResponseType` *extends* [`NextApiResponseLike`](../type-aliases/NextApiResponseLike.md) = [`NextApiResponseLike`](../type-aliases/NextApiResponseLike.md)

#### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\> = `Record`\<`PropertyKey`, `unknown`\>

### Parameters

#### defaults

`PickFactoriedOptions`\<[`WithMiddlewareOptions`](../../types/type-aliases/WithMiddlewareOptions.md)\<`Options`, `Heap`, [`LegacyMiddleware`](../../types/type-aliases/LegacyMiddleware.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>\>\>

### Returns

[`MiddlewareFactorySignatureLegacy`](../../types/type-aliases/MiddlewareFactorySignatureLegacy.md)\<`Options`, `RequestType`, `ResponseType`, `Heap`\>
