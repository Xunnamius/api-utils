[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/well-known-tokens](../README.md) / DUMMY\_BEARER\_TOKEN

# Variable: DUMMY\_BEARER\_TOKEN

> `const` **DUMMY\_BEARER\_TOKEN**: `"12349b61-83a7-4036-b060-213784b491"` = `'12349b61-83a7-4036-b060-213784b491'`

Defined in: [packages/api-strategy/src/auth/well-known-tokens.ts:16](https://github.com/Xunnamius/api-utils/blob/3905fc4975c9f15e022202427b124cf715fcf3dc/packages/api-strategy/src/auth/well-known-tokens.ts#L16)

This string allows authenticated API access only when running in a test
environment (i.e. `NODE_ENV=test`). This string cannot be used for
authenticated HTTP access to the API in production.
