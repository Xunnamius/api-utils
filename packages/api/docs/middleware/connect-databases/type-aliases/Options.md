[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/connect-databases](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [packages/api/src/middleware/connect-databases.ts:19](https://github.com/Xunnamius/api-utils/blob/559770a60e6903bf2f195d0d5f6450a09f08cf05/packages/api/src/middleware/connect-databases.ts#L19)

## Properties

### database

> **database**: `object`

Defined in: [packages/api/src/middleware/connect-databases.ts:23](https://github.com/Xunnamius/api-utils/blob/559770a60e6903bf2f195d0d5f6450a09f08cf05/packages/api/src/middleware/connect-databases.ts#L23)

Options specific to the connect-databases middleware.

#### data()

> **data**: () => `DummyData`

Passed to setDummyData at the appropriate point.

This function's contents become a no-op that is never run when outside of
a development environment (as determined by the NODE_ENV environment
variable).

##### Returns

`DummyData`

#### hydrationTargets?

> `optional` **hydrationTargets**: `string`[]

A list of database names or aliases that will be initialized and hydrated
with dummy data when NODE_ENV starts with "development" and the
API_HYDRATE_DB environment variable is defined.

Usually, "root" should always been listed here. Similarly, the similarly
well-known alias "app" should also usually be listed here.

##### Default

```ts
['root', 'app']
```

#### schema()

> **schema**: () => `DbSchema`

Passed to setSchemaConfig at the appropriate point.

##### Returns

`DbSchema`
