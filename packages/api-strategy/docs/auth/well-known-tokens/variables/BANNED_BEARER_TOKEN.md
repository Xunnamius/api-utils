[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/well-known-tokens](../README.md) / BANNED\_BEARER\_TOKEN

# Variable: BANNED\_BEARER\_TOKEN

> `const` **BANNED\_BEARER\_TOKEN**: `"banned-h54e-6rt7-gctfh-hrftdygct0"` = `'banned-h54e-6rt7-gctfh-hrftdygct0'`

Defined in: [packages/api-strategy/src/auth/well-known-tokens.ts:23](https://github.com/Xunnamius/api-utils/blob/840d5baca8526043aadc1db57d1845b3fe2f876c/packages/api-strategy/src/auth/well-known-tokens.ts#L23)

This string is guaranteed to be rate limited when running in a test
environment (i.e. `NODE_ENV=test`). This string cannot be used for
authenticated HTTP access to the API in production.
