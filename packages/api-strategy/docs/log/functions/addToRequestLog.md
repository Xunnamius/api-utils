[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [log](../README.md) / addToRequestLog

# Function: addToRequestLog()

## Call Signature

> **addToRequestLog**(`options`): `Promise`\<`void`\>

Defined in: [packages/api-strategy/src/log.ts:37](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/log.ts#L37)

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

Defined in: [packages/api-strategy/src/log.ts:56](https://github.com/Xunnamius/api-utils/blob/d69fc4b10948b0fd555b5e8b1869b9e8266c0fb8/packages/api-strategy/src/log.ts#L56)

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
