# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## @-xun/api-strategy[@1.3.0][3] (2025-07-05)

### ✨ Features

- **packages/api-strategy:** allow `createToken` to return safe public auth entry projection if desired ([ffd764e][4])

### 🪄 Fixes

- **packages/api-strategy:** allow empty `getTokens` filter to return all tokens ([62ce940][5])
- **packages/api-strategy:** always use safe request url for logging ([fea016d][6])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.3.2][7] (2025-07-07)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-item from 1.1.1 to 1.2.0 ([1570a45][8])
- **deps:** bump @-xun/mongo-schema from 1.1.5 to 1.2.0 ([a9a5ef5][9])
- **deps:** bump @-xun/mongo-test from 1.1.5 to 1.1.6 ([113a0a1][10])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.3.1][11] (2025-07-07)

#### 🪄 Fixes

- **packages/api-strategy:** re-export @-xun/api-error ([6e6f457][12])

<br />

## @-xun/api-strategy[@1.2.0][13] (2025-07-03)

### ✨ Features

- **packages/api-strategy:** add `after_id` filter support to `getTokens` ([c4e9600][14])

<br />

## @-xun/api-strategy[@1.1.0][15] (2025-07-03)

### ✨ Features

- **packages/api-strategy:** add polymorphic call signatures for legacy and modern flows ([244cd41][16])

### 🪄 Fixes

- **packages/api-strategy:** throw exported error classes where appropriate ([5bb8a08][17])

### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([bb386ec][18])
- **packages/api-strategy:** add missing dependencies ([459cb18][19])
- **packages/shared:** use the full `NextApiRequest` and `NextApiResponse` types without importing Next.js ([71b4768][20])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.1.1][21] (2025-07-03)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-schema from 1.1.4 to 1.1.5 ([552dadd][22])
- **deps:** bump @-xun/mongo-test from 1.1.4 to 1.1.5 ([078ac79][23])

<br />

## @-xun/api-strategy[@1.0.0][24] (2025-07-01)

### ✨ Features

- **packages/api-strategy:** implement @-xun/api-strategy ([d53cb85][25])
- **packages/shared:** add `getAuthorizationHeaderFromRequestLike` shared export ([5585ea5][26])

### 🪄 Fixes

- **packages/shared:** fix next-like type guards, add tests ([49ac95a][27])

### ⚙️ Build System

- Add `/error` package entry point ([dd43caf][28])
- **deps:** bump @-xun/mongo-item from 1.0.0 to 1.1.0 ([b7b3c8a][29])
- **deps:** bump @-xun/mongo-item from 1.1.0 to 1.1.1 ([d6b0f9b][30])
- **deps:** bump @-xun/mongo-schema from 1.1.2 to 1.1.3 ([f599b52][31])
- **deps:** bump @-xun/mongo-schema from 1.1.3 to 1.1.4 ([34c55af][32])
- **deps:** bump @-xun/mongo-test from 1.1.2 to 1.1.3 ([d880291][33])
- **deps:** bump @-xun/mongo-test from 1.1.3 to 1.1.4 ([7c84989][34])
- **deps:** bump internal monorepo interdependencies to latest versions ([1b2cdce][35])
- Force publish from latest checkpoint ([89abbe6][36])
- Update dependencies ([9084a63][37])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.2.0...@-xun/api-strategy@1.3.0
[4]: https://github.com/Xunnamius/api-utils/commit/ffd764eb3bfa50fb65bd24b7a5d6e25fd6b69d86
[5]: https://github.com/Xunnamius/api-utils/commit/62ce9407b3543e25ddef539cc89f51bfc7583023
[6]: https://github.com/Xunnamius/api-utils/commit/fea016dbfc5695c714458c8d24fb9a9edd046d36
[7]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.3.1...@-xun/api-strategy@1.3.2
[8]: https://github.com/Xunnamius/api-utils/commit/1570a456e76769954b992db14d79b09bab723a88
[9]: https://github.com/Xunnamius/api-utils/commit/a9a5ef511c9e0e0bfc5c522d0d865c96b23bd976
[10]: https://github.com/Xunnamius/api-utils/commit/113a0a1542a969d2b7efc5f2221058449ff2d474
[11]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.3.0...@-xun/api-strategy@1.3.1
[12]: https://github.com/Xunnamius/api-utils/commit/6e6f457f81ef4777a4dfe56367f8c149c634821e
[13]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.1.1...@-xun/api-strategy@1.2.0
[14]: https://github.com/Xunnamius/api-utils/commit/c4e96008fb8e0dd5fdfbead84f2e3657f2f0352f
[15]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.0.0...@-xun/api-strategy@1.1.0
[16]: https://github.com/Xunnamius/api-utils/commit/244cd4199c51c722faf14d9ef6d414a003d54007
[17]: https://github.com/Xunnamius/api-utils/commit/5bb8a08ebd94ae012f5b5d8bb041afc1ec4365d5
[18]: https://github.com/Xunnamius/api-utils/commit/bb386ecc96d3a0eae9042502ad8d325c18207904
[19]: https://github.com/Xunnamius/api-utils/commit/459cb18140650b37c691381ef62eb0e4bc058a38
[20]: https://github.com/Xunnamius/api-utils/commit/71b4768957b597ca1b5c617189c9042977d621ab
[21]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.1.0...@-xun/api-strategy@1.1.1
[22]: https://github.com/Xunnamius/api-utils/commit/552daddc9e7f2bdd58e117725926145468ffbfce
[23]: https://github.com/Xunnamius/api-utils/commit/078ac79d79f7b2e1122e035c025770378a78216c
[24]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@0.0.0-init...@-xun/api-strategy@1.0.0
[25]: https://github.com/Xunnamius/api-utils/commit/d53cb855ef51159b69dbb8aaf4525f90a00e3242
[26]: https://github.com/Xunnamius/api-utils/commit/5585ea57aa67c979523ec530243ab41d89ed5961
[27]: https://github.com/Xunnamius/api-utils/commit/49ac95a31e0bee5f9dee84ee70041edf855c2277
[28]: https://github.com/Xunnamius/api-utils/commit/dd43caf0e5d04049aa699f225be601c9952cb596
[29]: https://github.com/Xunnamius/api-utils/commit/b7b3c8a794a01e4374b2b231abba52b2ba550735
[30]: https://github.com/Xunnamius/api-utils/commit/d6b0f9bb5101d87ce777df75968cc8a7888048a9
[31]: https://github.com/Xunnamius/api-utils/commit/f599b52f091f6fe39c30b4fc005a17aee5096e5a
[32]: https://github.com/Xunnamius/api-utils/commit/34c55af76030b70bd59cc25ad38bcfbcd73611d7
[33]: https://github.com/Xunnamius/api-utils/commit/d8802913b72167ffff2da46d7e7e4dfb1825f4de
[34]: https://github.com/Xunnamius/api-utils/commit/7c84989076984f7e310f0a3851e808547a621393
[35]: https://github.com/Xunnamius/api-utils/commit/1b2cdce39cc4ea7b3e3d556bf155064c167a7525
[36]: https://github.com/Xunnamius/api-utils/commit/89abbe6937ec39fc9d2eb19430d0e8d5b1321810
[37]: https://github.com/Xunnamius/api-utils/commit/9084a634affb98946e9eaa4c997fb803ccab3852
