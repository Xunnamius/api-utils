[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/well-known-tokens](../README.md) / BANNED\_BEARER\_TOKEN

# Variable: BANNED\_BEARER\_TOKEN

> `const` **BANNED\_BEARER\_TOKEN**: `"banned-h54e-6rt7-gctfh-hrftdygct0"` = `'banned-h54e-6rt7-gctfh-hrftdygct0'`

Defined in: [auth/well-known-tokens.ts:23](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/auth/well-known-tokens.ts#L23)

This string is guaranteed to be rate limited when running in a test
environment (i.e. `NODE_ENV=test`). This string cannot be used for
authenticated HTTP access to the API in production.
