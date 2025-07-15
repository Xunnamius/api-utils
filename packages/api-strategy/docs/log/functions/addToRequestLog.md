[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [log](../README.md) / addToRequestLog

# Function: addToRequestLog()

## Call Signature

> **addToRequestLog**(`options`): `Promise`\<`void`\>

Defined in: [packages/api-strategy/src/log.ts:41](https://github.com/Xunnamius/api-utils/blob/60a2178cffe0885ecc2a390e9b6bc795373b5e0b/packages/api-strategy/src/log.ts#L41)

This function adds a request metadata entry to the database.

### Parameters

#### options

##### durationMs

`number`

##### endpoint

`undefined` \| `null` \| `string`

##### request

`Request`

##### response

`Response`

### Returns

`Promise`\<`void`\>

## Call Signature

> **addToRequestLog**(`options`): `Promise`\<`void`\>

Defined in: [packages/api-strategy/src/log.ts:60](https://github.com/Xunnamius/api-utils/blob/60a2178cffe0885ecc2a390e9b6bc795373b5e0b/packages/api-strategy/src/log.ts#L60)

This function adds a request metadata entry to the database.

Note that this async function **does not have to be awaited**. It's fire and
forget!

### Parameters

#### options

##### durationMs

`number`

##### endpoint

`undefined` \| `null` \| `string`

##### req

`NextApiRequestLike`

##### res

`NextApiResponseLike`

### Returns

`Promise`\<`void`\>

### Example

```
doSomeStuff();
void addToRequestLog({ req, res, endpoint });
doSomeOtherStuff();
```
