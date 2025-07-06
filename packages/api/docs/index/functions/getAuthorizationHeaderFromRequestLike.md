[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [index](../README.md) / getAuthorizationHeaderFromRequestLike

# Function: getAuthorizationHeaderFromRequestLike()

> **getAuthorizationHeaderFromRequestLike**(`client`): `undefined` \| `string`

Defined in: [packages/shared/src/next-like.ts:78](https://github.com/Xunnamius/api-utils/blob/20b3c0a8fb0d738da534e0b5a18ecc7bfb431124/packages/shared/src/next-like.ts#L78)

Accepts an authorization header string or something resembling a
Request and returns either an authorization header string or
`undefined`.

## Parameters

### client

`string` | `Request` | [`NextApiRequestLike`](../interfaces/NextApiRequestLike.md)

## Returns

`undefined` \| `string`
