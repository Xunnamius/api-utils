[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/auth-request](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [packages/api/src/middleware/auth-request.ts:16](https://github.com/Xunnamius/api-utils/blob/c09789cf368e76cc20c657b2a1b00afeebcaaa9d/packages/api/src/middleware/auth-request.ts#L16)

## Properties

### requiresAuth

> **requiresAuth**: `boolean` \| \{ `filter?`: `TokenAttributesFilter`; \}

Defined in: [packages/api/src/middleware/auth-request.ts:26](https://github.com/Xunnamius/api-utils/blob/c09789cf368e76cc20c657b2a1b00afeebcaaa9d/packages/api/src/middleware/auth-request.ts#L26)

If not `false` or falsy, accessing this endpoint requires a valid (yet
unfortunately named) Authorization header.

If a filter is provided, the request will be authorized conditioned upon
said filter (see getAuthedClientToken and
TokenAttributesFilter). If no filter is provided, all requests will
be vacuously authorized.
