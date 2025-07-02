[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / ModernBasicApiHandler

# Type Alias: ModernBasicApiHandler()\<RequestType, ResponseType\>

> **ModernBasicApiHandler**\<`RequestType`, `ResponseType`\> = (`request`) => `Promisable`\<`ResponseType` \| `undefined` \| `void`\>

Defined in: [packages/api/src/types.ts:48](https://github.com/Xunnamius/api-utils/blob/2999e4472bea4c5a8ecd8f7c7fbf77e6b4bc26db/packages/api/src/types.ts#L48)

The shape of a modern fetch request handler that is also consumable by third
parties.

This is a reduced-functionality version of [ModernApiHandler](ModernApiHandler.md).

## Type Parameters

### RequestType

`RequestType` *extends* `Request` = `Request`

### ResponseType

`ResponseType` *extends* `Response` = `Response`

## Parameters

### request

`RequestType`

## Returns

`Promisable`\<`ResponseType` \| `undefined` \| `void`\>
