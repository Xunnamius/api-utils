[**@-xun/api-strategy**](../../README.md)

***

[@-xun/api-strategy](../../README.md) / [log](../README.md) / addToRequestLog

# Function: addToRequestLog()

> **addToRequestLog**(`__namedParameters`): `Promise`\<`void`\>

Defined in: [log.ts:45](https://github.com/Xunnamius/api-utils/blob/8d6e1a099d5192943800c743fb55cb84fe76c862/packages/api-strategy/src/log.ts#L45)

This function adds a request metadata entry to the database.

Note that this async function **does not have to be awaited**. It's fire and
forget!

## Parameters

### \_\_namedParameters

#### durationMs

`number`

#### endpoint

`undefined` \| `null` \| `string`

#### req

`NextApiRequestLike`

#### res

`NextApiResponseLike`

## Returns

`Promise`\<`void`\>

## Example

```
doSomeStuff();
void addToRequestLog({ req, res, endpoint });
doSomeOtherStuff();
```
