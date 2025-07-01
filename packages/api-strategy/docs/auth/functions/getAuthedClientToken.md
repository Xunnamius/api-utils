[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / getAuthedClientToken

# Function: getAuthedClientToken()

## Call Signature

> **getAuthedClientToken**(`req`, `options?`): `Promise`\<`undefined` \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>

Defined in: [auth.ts:81](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/auth.ts#L81)

Authenticates a client (via bearer token) to continue past the point where
this function was invoked. Additional authorization can be performed via the
`filter` option.

Authentication (and authorization) is accomplished by checking their
Authorization header against entries in the well-known "auth" MongoDB
collection.

By default this function returns `undefined` (i.e. **does not throw**) if the
client cannot be authed.

WARNING: this function **DOES NOT** throw on auth failure (by default)!

### Parameters

#### req

`NextApiRequestLike`

#### options?

`Partial`\<\{ `errorBehavior?`: `"return-undefined"` \| `"reject"`; `filter?`: `Partial`\<\{ `isGlobalAdmin`: `boolean`; `owner`: `string` \| `string`[]; \}\>; \}\>

### Returns

`Promise`\<`undefined` \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>

## Call Signature

> **getAuthedClientToken**(`request`, `options?`): `Promise`\<`undefined` \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>

Defined in: [auth.ts:85](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/auth.ts#L85)

Authenticates a client (via bearer token) to continue past the point where
this function was invoked. Additional authorization can be performed via the
`filter` option.

Authentication (and authorization) is accomplished by checking their
Authorization header against entries in the well-known "auth" MongoDB
collection.

By default this function returns `undefined` (i.e. **does not throw**) if the
client cannot be authed.

WARNING: this function **DOES NOT** throw on auth failure (by default)!

### Parameters

#### request

`Request`

#### options?

`Partial`\<\{ `errorBehavior?`: `"return-undefined"` \| `"reject"`; `filter?`: `Partial`\<\{ `isGlobalAdmin`: `boolean`; `owner`: `string` \| `string`[]; \}\>; \}\>

### Returns

`Promise`\<`undefined` \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>

## Call Signature

> **getAuthedClientToken**(`authorizationHeader`, `options?`): `Promise`\<`undefined` \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>

Defined in: [auth.ts:89](https://github.com/Xunnamius/api-utils/blob/ac17224c10995432e1a7a0ea8baa75521f83afd6/packages/api-strategy/src/auth.ts#L89)

Authenticates a client (via bearer token) to continue past the point where
this function was invoked. Additional authorization can be performed via the
`filter` option.

Authentication (and authorization) is accomplished by checking their
Authorization header against entries in the well-known "auth" MongoDB
collection.

By default this function returns `undefined` (i.e. **does not throw**) if the
client cannot be authed.

WARNING: this function **DOES NOT** throw on auth failure (by default)!

### Parameters

#### authorizationHeader

`string`

#### options?

`Partial`\<\{ `errorBehavior?`: `"return-undefined"` \| `"reject"`; `filter?`: `Partial`\<\{ `isGlobalAdmin`: `boolean`; `owner`: `string` \| `string`[]; \}\>; \}\>

### Returns

`Promise`\<`undefined` \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>
