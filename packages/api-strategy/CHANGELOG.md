# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## @-xun/api-strategy[@1.2.0][3] (2025-07-03)

### ✨ Features

- **packages/api-strategy:** add `after_id` filter support to `getTokens` ([c4e9600][4])

<br />

## @-xun/api-strategy[@1.1.0][5] (2025-07-03)

### ✨ Features

- **packages/api-strategy:** add polymorphic call signatures for legacy and modern flows ([244cd41][6])

### 🪄 Fixes

- **packages/api-strategy:** throw exported error classes where appropriate ([5bb8a08][7])

### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([bb386ec][8])
- **packages/api-strategy:** add missing dependencies ([459cb18][9])
- **packages/shared:** use the full `NextApiRequest` and `NextApiResponse` types without importing Next.js ([71b4768][10])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.1.1][11] (2025-07-03)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-schema from 1.1.4 to 1.1.5 ([552dadd][12])
- **deps:** bump @-xun/mongo-test from 1.1.4 to 1.1.5 ([078ac79][13])

<br />

## @-xun/api-strategy[@1.0.0][14] (2025-07-01)

### ✨ Features

- **packages/api-strategy:** implement @-xun/api-strategy ([d53cb85][15])
- **packages/shared:** add `getAuthorizationHeaderFromRequestLike` shared export ([5585ea5][16])

### 🪄 Fixes

- **packages/shared:** fix next-like type guards, add tests ([49ac95a][17])

### ⚙️ Build System

- Add `/error` package entry point ([dd43caf][18])
- **deps:** bump @-xun/mongo-item from 1.0.0 to 1.1.0 ([b7b3c8a][19])
- **deps:** bump @-xun/mongo-item from 1.1.0 to 1.1.1 ([d6b0f9b][20])
- **deps:** bump @-xun/mongo-schema from 1.1.2 to 1.1.3 ([f599b52][21])
- **deps:** bump @-xun/mongo-schema from 1.1.3 to 1.1.4 ([34c55af][22])
- **deps:** bump @-xun/mongo-test from 1.1.2 to 1.1.3 ([d880291][23])
- **deps:** bump @-xun/mongo-test from 1.1.3 to 1.1.4 ([7c84989][24])
- **deps:** bump internal monorepo interdependencies to latest versions ([1b2cdce][25])
- Force publish from latest checkpoint ([89abbe6][26])
- Update dependencies ([9084a63][27])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.1.1...@-xun/api-strategy@1.2.0
[4]: https://github.com/Xunnamius/api-utils/commit/c4e96008fb8e0dd5fdfbead84f2e3657f2f0352f
[5]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.0.0...@-xun/api-strategy@1.1.0
[6]: https://github.com/Xunnamius/api-utils/commit/244cd4199c51c722faf14d9ef6d414a003d54007
[7]: https://github.com/Xunnamius/api-utils/commit/5bb8a08ebd94ae012f5b5d8bb041afc1ec4365d5
[8]: https://github.com/Xunnamius/api-utils/commit/bb386ecc96d3a0eae9042502ad8d325c18207904
[9]: https://github.com/Xunnamius/api-utils/commit/459cb18140650b37c691381ef62eb0e4bc058a38
[10]: https://github.com/Xunnamius/api-utils/commit/71b4768957b597ca1b5c617189c9042977d621ab
[11]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.1.0...@-xun/api-strategy@1.1.1
[12]: https://github.com/Xunnamius/api-utils/commit/552daddc9e7f2bdd58e117725926145468ffbfce
[13]: https://github.com/Xunnamius/api-utils/commit/078ac79d79f7b2e1122e035c025770378a78216c
[14]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@0.0.0-init...@-xun/api-strategy@1.0.0
[15]: https://github.com/Xunnamius/api-utils/commit/d53cb855ef51159b69dbb8aaf4525f90a00e3242
[16]: https://github.com/Xunnamius/api-utils/commit/5585ea57aa67c979523ec530243ab41d89ed5961
[17]: https://github.com/Xunnamius/api-utils/commit/49ac95a31e0bee5f9dee84ee70041edf855c2277
[18]: https://github.com/Xunnamius/api-utils/commit/dd43caf0e5d04049aa699f225be601c9952cb596
[19]: https://github.com/Xunnamius/api-utils/commit/b7b3c8a794a01e4374b2b231abba52b2ba550735
[20]: https://github.com/Xunnamius/api-utils/commit/d6b0f9bb5101d87ce777df75968cc8a7888048a9
[21]: https://github.com/Xunnamius/api-utils/commit/f599b52f091f6fe39c30b4fc005a17aee5096e5a
[22]: https://github.com/Xunnamius/api-utils/commit/34c55af76030b70bd59cc25ad38bcfbcd73611d7
[23]: https://github.com/Xunnamius/api-utils/commit/d8802913b72167ffff2da46d7e7e4dfb1825f4de
[24]: https://github.com/Xunnamius/api-utils/commit/7c84989076984f7e310f0a3851e808547a621393
[25]: https://github.com/Xunnamius/api-utils/commit/1b2cdce39cc4ea7b3e3d556bf155064c167a7525
[26]: https://github.com/Xunnamius/api-utils/commit/89abbe6937ec39fc9d2eb19430d0e8d5b1321810
[27]: https://github.com/Xunnamius/api-utils/commit/9084a634affb98946e9eaa4c997fb803ccab3852
