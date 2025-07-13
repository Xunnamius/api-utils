[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/add-raw-body](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [packages/api/src/middleware/add-raw-body.ts:24](https://github.com/Xunnamius/api-utils/blob/60863c4db4ba817b2926c481da6a42f07a7c9992/packages/api/src/middleware/add-raw-body.ts#L24)

## Properties

### requestBodySizeLimit?

> `optional` **requestBodySizeLimit**: `number` \| `string` \| `null`

Defined in: [packages/api/src/middleware/add-raw-body.ts:33](https://github.com/Xunnamius/api-utils/blob/60863c4db4ba817b2926c481da6a42f07a7c9992/packages/api/src/middleware/add-raw-body.ts#L33)

The byte limit of the request body. This is the number of bytes or any
string format supported by bytes, for example `1000`, `'500kb'` or `'3mb'`.

#### Default

```ts
defaultRequestBodySizeLimit (see source)
```

#### See

https://nextjs.org/docs/api-routes/api-middlewares#custom-config
