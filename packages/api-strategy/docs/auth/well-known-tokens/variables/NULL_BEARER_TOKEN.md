[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/well-known-tokens](../README.md) / NULL\_BEARER\_TOKEN

# Variable: NULL\_BEARER\_TOKEN

> `const` **NULL\_BEARER\_TOKEN**: `"00000000-0000-0000-0000-000000000000"` = `'00000000-0000-0000-0000-000000000000'`

Defined in: [packages/api-strategy/src/auth/well-known-tokens.ts:9](https://github.com/Xunnamius/api-utils/blob/f7980bf9d2336364841bd054b4ab2fc66322ed4a/packages/api-strategy/src/auth/well-known-tokens.ts#L9)

This string is guaranteed never to appear in data generated during tests or
in production. Hence, this string can be used to represent a `null` or
non-existent token. This string cannot be used for authenticated HTTP access
to the API.
