[**@-xun/respond**](../../README.md)

***

[@-xun/respond](../../README.md) / [index](../README.md) / sendGenericHttpResponse

# Function: sendGenericHttpResponse()

## Call Signature

> **sendGenericHttpResponse**(...`args`): `Response`

Defined in: [index.ts:49](https://github.com/Xunnamius/api-utils/blob/7043346440f4234ebd4f9ce5c0c70a3a86a21c41/packages/respond/src/index.ts#L49)

Sends a generic HTTP response with the given `statusCode` and optional JSON
body (defaults to `{}`). This is the "base" function called by all other
response functions.

### Parameters

#### args

...`ModernGenericParameters`

### Returns

`Response`

## Call Signature

> **sendGenericHttpResponse**(...`args`): `void`

Defined in: [index.ts:50](https://github.com/Xunnamius/api-utils/blob/7043346440f4234ebd4f9ce5c0c70a3a86a21c41/packages/respond/src/index.ts#L50)

Sends a generic HTTP response with the given `statusCode` and optional JSON
body (defaults to `{}`). This is the "base" function called by all other
response functions.

### Parameters

#### args

...`LegacyGenericParameters`

### Returns

`void`

## Call Signature

> **sendGenericHttpResponse**(...`args`): `void` \| `Response`

Defined in: [index.ts:51](https://github.com/Xunnamius/api-utils/blob/7043346440f4234ebd4f9ce5c0c70a3a86a21c41/packages/respond/src/index.ts#L51)

Sends a generic HTTP response with the given `statusCode` and optional JSON
body (defaults to `{}`). This is the "base" function called by all other
response functions.

### Parameters

#### args

`ModernGenericParameters` | `LegacyGenericParameters`

### Returns

`void` \| `Response`
