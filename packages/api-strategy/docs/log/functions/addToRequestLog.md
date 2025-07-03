[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [log](../README.md) / addToRequestLog

# Function: addToRequestLog()

## Call Signature

> **addToRequestLog**(`options`): `Promise`\<`void`\>

Defined in: [packages/api-strategy/src/log.ts:37](https://github.com/Xunnamius/api-utils/blob/4b9cf49c1b8ec6d8960c6a16e9e497be226b121a/packages/api-strategy/src/log.ts#L37)

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

Defined in: [packages/api-strategy/src/log.ts:56](https://github.com/Xunnamius/api-utils/blob/4b9cf49c1b8ec6d8960c6a16e9e497be226b121a/packages/api-strategy/src/log.ts#L56)

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
