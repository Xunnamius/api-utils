[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [index](../README.md) / NextApiResponseLike

# Type Alias: NextApiResponseLike

> **NextApiResponseLike** = `ServerResponse` & `object`

Defined in: [packages/shared/src/next-like.ts:26](https://github.com/Xunnamius/api-utils/blob/57bcbde0493ed3285651262eed2a32e963f10249/packages/shared/src/next-like.ts#L26)

An object that is probably a `NextApiResponse`.

## Type declaration

### clearPreviewData()

> **clearPreviewData**: (`options?`) => `NextApiResponseLike`

#### Parameters

##### options?

###### path?

`string`

#### Returns

`NextApiResponseLike`

### json()

> **json**: (`body`) => `void`

#### Parameters

##### body

`any`

#### Returns

`void`

### revalidate()

> **revalidate**: (`urlPath`, `opts?`) => `Promise`\<`void`\>

#### Parameters

##### urlPath

`string`

##### opts?

###### unstable_onlyGenerated?

`boolean`

#### Returns

`Promise`\<`void`\>

### send()

> **send**: (`body`) => `void`

#### Parameters

##### body

`any`

#### Returns

`void`

### setDraftMode()

> **setDraftMode**: (`options`) => `NextApiResponseLike`

#### Parameters

##### options

###### enable

`boolean`

#### Returns

`NextApiResponseLike`

### setPreviewData()

> **setPreviewData**: (`data`, `options?`) => `NextApiResponseLike`

#### Parameters

##### data

`object` | `string`

##### options?

###### maxAge?

`number`

###### path?

`string`

#### Returns

`NextApiResponseLike`

### status()

> **status**: (`statusCode`) => `NextApiResponseLike`

#### Parameters

##### statusCode

`number`

#### Returns

`NextApiResponseLike`

### redirect()

#### Call Signature

> **redirect**(`url`): `NextApiResponseLike`

##### Parameters

###### url

`string`

##### Returns

`NextApiResponseLike`

#### Call Signature

> **redirect**(`status`, `url`): `NextApiResponseLike`

##### Parameters

###### status

`number`

###### url

`string`

##### Returns

`NextApiResponseLike`
