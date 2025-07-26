[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [auth](../README.md) / getAuthedClientToken

# Function: getAuthedClientToken()

## Call Signature

> **getAuthedClientToken**(`req`, `options?`): `Promise`\<`undefined` \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>

Defined in: [packages/api-strategy/src/auth.ts:84](https://github.com/Xunnamius/api-utils/blob/52a8c73e7bc88df6639a2fe1c2313f726aa468a9/packages/api-strategy/src/auth.ts#L84)

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

Defined in: [packages/api-strategy/src/auth.ts:88](https://github.com/Xunnamius/api-utils/blob/52a8c73e7bc88df6639a2fe1c2313f726aa468a9/packages/api-strategy/src/auth.ts#L88)

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

Defined in: [packages/api-strategy/src/auth.ts:92](https://github.com/Xunnamius/api-utils/blob/52a8c73e7bc88df6639a2fe1c2313f726aa468a9/packages/api-strategy/src/auth.ts#L92)

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

## Call Signature

> **getAuthedClientToken**(`client`, `options?`): `Promise`\<`undefined` \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>

Defined in: [packages/api-strategy/src/auth.ts:96](https://github.com/Xunnamius/api-utils/blob/52a8c73e7bc88df6639a2fe1c2313f726aa468a9/packages/api-strategy/src/auth.ts#L96)

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

#### client

`string` | `NextApiRequestLike` | `Request`

#### options?

`Partial`\<\{ `errorBehavior?`: `"return-undefined"` \| `"reject"`; `filter?`: `Partial`\<\{ `isGlobalAdmin`: `boolean`; `owner`: `string` \| `string`[]; \}\>; \}\>

### Returns

`Promise`\<`undefined` \| [`SafePublicAuthEntry`](../types/type-aliases/SafePublicAuthEntry.md)\>
