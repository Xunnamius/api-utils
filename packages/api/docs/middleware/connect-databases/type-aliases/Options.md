[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/connect-databases](../README.md) / Options

# Type Alias: Options

> **Options** = `object`

Defined in: [packages/api/src/middleware/connect-databases.ts:19](https://github.com/Xunnamius/api-utils/blob/38288e756f37a9fa3bac377fdbaa51608d8bbed9/packages/api/src/middleware/connect-databases.ts#L19)

## Properties

### database

> **database**: `object`

Defined in: [packages/api/src/middleware/connect-databases.ts:23](https://github.com/Xunnamius/api-utils/blob/38288e756f37a9fa3bac377fdbaa51608d8bbed9/packages/api/src/middleware/connect-databases.ts#L23)

Options specific to the connect-databases middleware.

#### data()

> **data**: () => `DummyData`

Passed to setDummyData at the appropriate point.

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
