[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/well-known-tokens](../README.md) / NULL\_BEARER\_TOKEN

# Variable: NULL\_BEARER\_TOKEN

> `const` **NULL\_BEARER\_TOKEN**: `"00000000-0000-0000-0000-000000000000"` = `'00000000-0000-0000-0000-000000000000'`

Defined in: [packages/api-strategy/src/auth/well-known-tokens.ts:9](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/auth/well-known-tokens.ts#L9)

This string is guaranteed never to appear in data generated during tests or
in production. Hence, this string can be used to represent a `null` or
non-existent token. This string cannot be used for authenticated HTTP access
to the API.
