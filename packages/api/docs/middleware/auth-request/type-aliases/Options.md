[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/auth-request](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [packages/api/src/middleware/auth-request.ts:22](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/auth-request.ts#L22)

## Properties

### requiresAuth

> **requiresAuth**: `boolean` \| \{ `filter?`: `TokenAttributesFilter`; \}

Defined in: [packages/api/src/middleware/auth-request.ts:32](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/middleware/auth-request.ts#L32)

If not `false` or falsy, accessing this endpoint requires a valid (yet
unfortunately named) Authorization header.

If a filter is provided, the request will be authorized conditioned upon
said filter (see getAuthedClientToken and
TokenAttributesFilter). If no filter is provided, all requests will
be vacuously authorized.
