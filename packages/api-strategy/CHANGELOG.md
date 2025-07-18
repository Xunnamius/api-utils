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

### 🏗️ Patch @-xun/api-strategy[@1.3.8][7] (2025-07-15)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-schema from 1.3.1 to 1.3.2 ([be7a9b7][8])
- **deps:** bump @-xun/mongo-test from 3.0.1 to 3.0.2 ([77337a1][9])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.3.7][10] (2025-07-15)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-schema from 1.2.3 to 1.3.0 ([a70b1b7][11])
- **deps:** bump @-xun/mongo-schema from 1.3.0 to 1.3.1 ([1794f82][12])
- **deps:** bump @-xun/mongo-test from 2.0.0 to 2.1.1 ([6c05932][13])
- **deps:** bump @-xun/mongo-test from 2.1.1 to 2.1.2 ([cb4bb6f][14])
- **deps:** bump @-xun/mongo-test from 2.1.2 to 3.0.1 ([bc9df0c][15])
- **deps:** bump @-xun/types from 1.1.0 to 1.2.0 ([691f87a][16])
- **deps:** bump internal monorepo interdependencies to latest versions ([a4fb03e][17])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.3.6][18] (2025-07-13)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-item from 1.2.1 to 1.2.2 ([4f10178][19])
- **deps:** bump @-xun/mongo-item from 1.2.2 to 1.3.0 ([6f42384][20])
- **deps:** bump @-xun/mongo-schema from 1.2.1 to 1.2.3 ([0d5c2af][21])
- **deps:** bump @-xun/mongo-test from 1.1.7 to 1.2.1 ([20b3509][22])
- **deps:** bump @-xun/mongo-test from 1.2.1 to 1.2.2 ([ddd5f76][23])
- **deps:** bump @-xun/mongo-test from 1.2.2 to 1.3.0 ([f8bb38b][24])
- **deps:** bump @-xun/mongo-test from 1.3.0 to 2.0.0 ([e415a60][25])
- Use consistent internal logging ([a30bf7d][26])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.3.5][27] (2025-07-10)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([89a2ee1][28])
- **deps:** bump rejoinder from 2.0.1 to 2.0.2 ([27583f7][29])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.3.4][30] (2025-07-08)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-item from 1.2.0 to 1.2.1 ([ac2af13][31])
- **deps:** bump @-xun/mongo-schema from 1.2.0 to 1.2.1 ([ae4f5eb][32])
- **deps:** bump @-xun/mongo-test from 1.1.6 to 1.1.7 ([1a11de8][33])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.3.3][34] (2025-07-08)

#### ⚙️ Build System

- **deps:** bump core-js from 3.43.0 to 3.44.0 ([1672502][35])
- **deps:** bump internal monorepo interdependencies to latest versions ([e89995e][36])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.3.2][37] (2025-07-07)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-item from 1.1.1 to 1.2.0 ([1570a45][38])
- **deps:** bump @-xun/mongo-schema from 1.1.5 to 1.2.0 ([a9a5ef5][39])
- **deps:** bump @-xun/mongo-test from 1.1.5 to 1.1.6 ([113a0a1][40])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.3.1][41] (2025-07-07)

#### 🪄 Fixes

- **packages/api-strategy:** re-export @-xun/api-error ([6e6f457][42])

<br />

## @-xun/api-strategy[@1.2.0][43] (2025-07-03)

### ✨ Features

- **packages/api-strategy:** add `after_id` filter support to `getTokens` ([c4e9600][44])

<br />

## @-xun/api-strategy[@1.1.0][45] (2025-07-03)

### ✨ Features

- **packages/api-strategy:** add polymorphic call signatures for legacy and modern flows ([244cd41][46])

### 🪄 Fixes

- **packages/api-strategy:** throw exported error classes where appropriate ([5bb8a08][47])

### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([bb386ec][48])
- **packages/api-strategy:** add missing dependencies ([459cb18][49])
- **packages/shared:** use the full `NextApiRequest` and `NextApiResponse` types without importing Next.js ([71b4768][50])

<br />

### 🏗️ Patch @-xun/api-strategy[@1.1.1][51] (2025-07-03)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-schema from 1.1.4 to 1.1.5 ([552dadd][52])
- **deps:** bump @-xun/mongo-test from 1.1.4 to 1.1.5 ([078ac79][53])

<br />

## @-xun/api-strategy[@1.0.0][54] (2025-07-01)

### ✨ Features

- **packages/api-strategy:** implement @-xun/api-strategy ([d53cb85][55])
- **packages/shared:** add `getAuthorizationHeaderFromRequestLike` shared export ([5585ea5][56])

### 🪄 Fixes

- **packages/shared:** fix next-like type guards, add tests ([49ac95a][57])

### ⚙️ Build System

- Add `/error` package entry point ([dd43caf][58])
- **deps:** bump @-xun/mongo-item from 1.0.0 to 1.1.0 ([b7b3c8a][59])
- **deps:** bump @-xun/mongo-item from 1.1.0 to 1.1.1 ([d6b0f9b][60])
- **deps:** bump @-xun/mongo-schema from 1.1.2 to 1.1.3 ([f599b52][61])
- **deps:** bump @-xun/mongo-schema from 1.1.3 to 1.1.4 ([34c55af][62])
- **deps:** bump @-xun/mongo-test from 1.1.2 to 1.1.3 ([d880291][63])
- **deps:** bump @-xun/mongo-test from 1.1.3 to 1.1.4 ([7c84989][64])
- **deps:** bump internal monorepo interdependencies to latest versions ([1b2cdce][65])
- Force publish from latest checkpoint ([89abbe6][66])
- Update dependencies ([9084a63][67])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.2.0...@-xun/api-strategy@1.3.0
[4]: https://github.com/Xunnamius/api-utils/commit/ffd764eb3bfa50fb65bd24b7a5d6e25fd6b69d86
[5]: https://github.com/Xunnamius/api-utils/commit/62ce9407b3543e25ddef539cc89f51bfc7583023
[6]: https://github.com/Xunnamius/api-utils/commit/fea016dbfc5695c714458c8d24fb9a9edd046d36
[7]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.3.7...@-xun/api-strategy@1.3.8
[8]: https://github.com/Xunnamius/api-utils/commit/be7a9b7c01a04fba1963b8a61a3179fc4dcef194
[9]: https://github.com/Xunnamius/api-utils/commit/77337a14dc9cc56fe6c01b9a08b7b2be9c098129
[10]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.3.6...@-xun/api-strategy@1.3.7
[11]: https://github.com/Xunnamius/api-utils/commit/a70b1b7934a90ca95e5305a5c4257c18be76cb47
[12]: https://github.com/Xunnamius/api-utils/commit/1794f82cbef40788c9d46ccd6441ce844b7bd1f0
[13]: https://github.com/Xunnamius/api-utils/commit/6c059324e9031a8f5920a306b95949c87caff3fd
[14]: https://github.com/Xunnamius/api-utils/commit/cb4bb6fcb5530b0e9e4ceeb0c875bac54727af7e
[15]: https://github.com/Xunnamius/api-utils/commit/bc9df0cbdd10595c20523dc4cb0b69d7b4f9ba10
[16]: https://github.com/Xunnamius/api-utils/commit/691f87ae085f118382ae925ef98b59e9bbe40a7a
[17]: https://github.com/Xunnamius/api-utils/commit/a4fb03e0196776c23e54bb49f0a2c2ac326549f8
[18]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.3.5...@-xun/api-strategy@1.3.6
[19]: https://github.com/Xunnamius/api-utils/commit/4f1017850e50b8e4c093e90768933709f160b4f4
[20]: https://github.com/Xunnamius/api-utils/commit/6f423841eb97d098260a1a0f285c7916bc53401a
[21]: https://github.com/Xunnamius/api-utils/commit/0d5c2af3f945e3fc4c8e46cae0c09ca73c6dee48
[22]: https://github.com/Xunnamius/api-utils/commit/20b35096a1c9ca45bf0a8b17133edf8c216cc604
[23]: https://github.com/Xunnamius/api-utils/commit/ddd5f7613479b0e22729b5a725a952f370854967
[24]: https://github.com/Xunnamius/api-utils/commit/f8bb38bfab91b990a1636a8a584373a20b443649
[25]: https://github.com/Xunnamius/api-utils/commit/e415a603ba3374559b231baf34174b0e4b676658
[26]: https://github.com/Xunnamius/api-utils/commit/a30bf7d131fc211e9d0e8df82d859ef09d7a4489
[27]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.3.4...@-xun/api-strategy@1.3.5
[28]: https://github.com/Xunnamius/api-utils/commit/89a2ee1d854a0bcf81228170cd645d2233759b2f
[29]: https://github.com/Xunnamius/api-utils/commit/27583f72448778b6252d2fb62857faf8f1e008bd
[30]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.3.3...@-xun/api-strategy@1.3.4
[31]: https://github.com/Xunnamius/api-utils/commit/ac2af133e4913e6b2740e0e415b89ef9e5f738bc
[32]: https://github.com/Xunnamius/api-utils/commit/ae4f5eb972d645c9ff7e67f976c7cca7cd7b1041
[33]: https://github.com/Xunnamius/api-utils/commit/1a11de88998e0a5da82dc48470be4c6bfb500c30
[34]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.3.2...@-xun/api-strategy@1.3.3
[35]: https://github.com/Xunnamius/api-utils/commit/1672502487cbeabbca8dd9cdb41e6532788be132
[36]: https://github.com/Xunnamius/api-utils/commit/e89995ef52d353586127070ec45e10b85e4d11cc
[37]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.3.1...@-xun/api-strategy@1.3.2
[38]: https://github.com/Xunnamius/api-utils/commit/1570a456e76769954b992db14d79b09bab723a88
[39]: https://github.com/Xunnamius/api-utils/commit/a9a5ef511c9e0e0bfc5c522d0d865c96b23bd976
[40]: https://github.com/Xunnamius/api-utils/commit/113a0a1542a969d2b7efc5f2221058449ff2d474
[41]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.3.0...@-xun/api-strategy@1.3.1
[42]: https://github.com/Xunnamius/api-utils/commit/6e6f457f81ef4777a4dfe56367f8c149c634821e
[43]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.1.1...@-xun/api-strategy@1.2.0
[44]: https://github.com/Xunnamius/api-utils/commit/c4e96008fb8e0dd5fdfbead84f2e3657f2f0352f
[45]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.0.0...@-xun/api-strategy@1.1.0
[46]: https://github.com/Xunnamius/api-utils/commit/244cd4199c51c722faf14d9ef6d414a003d54007
[47]: https://github.com/Xunnamius/api-utils/commit/5bb8a08ebd94ae012f5b5d8bb041afc1ec4365d5
[48]: https://github.com/Xunnamius/api-utils/commit/bb386ecc96d3a0eae9042502ad8d325c18207904
[49]: https://github.com/Xunnamius/api-utils/commit/459cb18140650b37c691381ef62eb0e4bc058a38
[50]: https://github.com/Xunnamius/api-utils/commit/71b4768957b597ca1b5c617189c9042977d621ab
[51]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@1.1.0...@-xun/api-strategy@1.1.1
[52]: https://github.com/Xunnamius/api-utils/commit/552daddc9e7f2bdd58e117725926145468ffbfce
[53]: https://github.com/Xunnamius/api-utils/commit/078ac79d79f7b2e1122e035c025770378a78216c
[54]: https://github.com/Xunnamius/api-utils/compare/@-xun/api-strategy@0.0.0-init...@-xun/api-strategy@1.0.0
[55]: https://github.com/Xunnamius/api-utils/commit/d53cb855ef51159b69dbb8aaf4525f90a00e3242
[56]: https://github.com/Xunnamius/api-utils/commit/5585ea57aa67c979523ec530243ab41d89ed5961
[57]: https://github.com/Xunnamius/api-utils/commit/49ac95a31e0bee5f9dee84ee70041edf855c2277
[58]: https://github.com/Xunnamius/api-utils/commit/dd43caf0e5d04049aa699f225be601c9952cb596
[59]: https://github.com/Xunnamius/api-utils/commit/b7b3c8a794a01e4374b2b231abba52b2ba550735
[60]: https://github.com/Xunnamius/api-utils/commit/d6b0f9bb5101d87ce777df75968cc8a7888048a9
[61]: https://github.com/Xunnamius/api-utils/commit/f599b52f091f6fe39c30b4fc005a17aee5096e5a
[62]: https://github.com/Xunnamius/api-utils/commit/34c55af76030b70bd59cc25ad38bcfbcd73611d7
[63]: https://github.com/Xunnamius/api-utils/commit/d8802913b72167ffff2da46d7e7e4dfb1825f4de
[64]: https://github.com/Xunnamius/api-utils/commit/7c84989076984f7e310f0a3851e808547a621393
[65]: https://github.com/Xunnamius/api-utils/commit/1b2cdce39cc4ea7b3e3d556bf155064c167a7525
[66]: https://github.com/Xunnamius/api-utils/commit/89abbe6937ec39fc9d2eb19430d0e8d5b1321810
[67]: https://github.com/Xunnamius/api-utils/commit/9084a634affb98946e9eaa4c997fb803ccab3852
