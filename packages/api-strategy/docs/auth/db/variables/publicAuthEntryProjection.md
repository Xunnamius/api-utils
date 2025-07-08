[**@-xun/api-strategy**](../../../README.md)

***

[@-xun/api-strategy](../../../README.md) / [auth/db](../README.md) / publicAuthEntryProjection

# Variable: publicAuthEntryProjection

> `const` **publicAuthEntryProjection**: `object`

Defined in: [packages/api-strategy/src/auth/db.ts:21](https://github.com/Xunnamius/api-utils/blob/b785d9e67ba769b2480f64a9690c2911fb596cf7/packages/api-strategy/src/auth/db.ts#L21)

A MongoDB cursor projection that transforms an internal auth entry (or
"token") into an unsafe public auth entry.

**WARNING: the "public" auth entry contains sensitive information and is only
meant to be returned by privileged processes and endpoints!**

## Type declaration

### \_id

> **\_id**: `boolean` = `false`

### attributes

> **attributes**: `boolean` = `true`

### auth\_id

> **auth\_id**: `object`

#### auth\_id.$toString

> **$toString**: `string` = `'$_id'`

### token

> **token**: `boolean` = `true`
