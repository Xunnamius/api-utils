# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## @-xun/api[@1.1.0][3] (2025-07-13)

### ✨ Features

- **packages/api:** add new "connect-databases" middleware ([30c5a3a][4])

### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([a40dcb8][5])
- **packages/api:** ensure @-xun/mongo-test package is optional (not listed among prod deps) ([bbc5705][6])
- Use consistent internal logging ([a30bf7d][7])

<br />

### 🏗️ Patch @-xun/api[@1.1.4][8] (2025-07-26)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-schema from 1.3.2 to 1.4.0 ([91ea75d][9])
- **deps:** bump @-xun/mongo-schema from 1.4.0 to 1.5.0 ([95e944c][10])
- **deps:** bump internal monorepo interdependencies to latest versions ([251f9b3][11])

<br />

### 🏗️ Patch @-xun/api[@1.1.3][12] (2025-07-15)

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-schema from 1.3.1 to 1.3.2 ([f6eeabc][13])
- **deps:** bump internal monorepo interdependencies to latest versions ([5156193][14])

<br />

### 🏗️ Patch @-xun/api[@1.1.2][15] (2025-07-15)

#### 🪄 Fixes

- **packages/api:** use latest @-xun/mongo-test interface ([8611a80][16])

#### ⚙️ Build System

- **deps:** bump @-xun/mongo-schema from 1.2.3 to 1.3.0 ([f7a886a][17])
- **deps:** bump @-xun/mongo-schema from 1.3.0 to 1.3.1 ([be3157f][18])
- **deps:** bump @-xun/types from 1.1.0 to 1.2.0 ([a285bb0][19])
- **deps:** bump internal monorepo interdependencies to latest versions ([54b005f][20])

<br />

### 🏗️ Patch @-xun/api[@1.1.1][21] (2025-07-13)

#### 🪄 Fixes

- **packages/api:** improve exported types ([60863c4][22])

<br />

## @-xun/api[@1.0.0][23] (2025-07-03)

### ✨ Features

- **packages/shared:** add `getAuthorizationHeaderFromRequestLike` shared export ([5585ea5][24])
- **packages:** land initial re-implementation of @-xun/api ([c4afda0][25])

### 🪄 Fixes

- **packages/api:** do not return Response in legacy mode ([4616e2a][26])
- **packages/api:** ignore attempts to set runtime response to non-Response type ([47aa438][27])
- **packages/shared:** fix next-like type guards, add tests ([49ac95a][28])

### ⚙️ Build System

- Add `/error` package entry point ([dd43caf][29])
- **deps:** bump @-xun/mongo-schema from 1.1.2 to 1.1.3 ([ad3e997][30])
- **deps:** bump @-xun/mongo-schema from 1.1.3 to 1.1.4 ([bbee847][31])
- **deps:** bump internal monorepo interdependencies to latest versions ([5dfce1e][32])
- Force publish from latest checkpoint ([89abbe6][33])
- **packages/api:** fix exports paths ([604757a][34])
- **packages/shared:** use the full `NextApiRequest` and `NextApiResponse` types without importing Next.js ([71b4768][35])

<br />

### 🏗️ Patch @-xun/api[@1.0.10][36] (2025-07-10)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([950450e][37])
- **deps:** bump rejoinder from 2.0.1 to 2.0.2 ([833bd12][38])

<br />

### 🏗️ Patch @-xun/api[@1.0.9][39] (2025-07-08)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([7c2849c][40])

<br />

### 🏗️ Patch @-xun/api[@1.0.8][41] (2025-07-08)

#### 🪄 Fixes

- **packages/api:** integrate latest @-xun/error fixes ([dbaeec5][42])

#### ⚙️ Build System

- **deps:** bump core-js from 3.43.0 to 3.44.0 ([9a91a52][43])
- **deps:** bump internal monorepo interdependencies to latest versions ([e975dcc][44])
- **deps:** bump internal monorepo interdependencies to latest versions ([5028ad8][45])

<br />

### 🏗️ Patch @-xun/api[@1.0.7][46] (2025-07-07)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([e54f00b][47])

<br />

### 🏗️ Patch @-xun/api[@1.0.6][48] (2025-07-07)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([b76dd9c][49])

<br />

### 🏗️ Patch @-xun/api[@1.0.5][50] (2025-07-06)

#### 🪄 Fixes

- **packages/api:** fix several bugs; improve test coverage to 100% with 100% passing ([2e722d0][51])

<br />

### 🏗️ Patch @-xun/api[@1.0.4][52] (2025-07-06)

#### 🪄 Fixes

- **packages/api:** improve error handling behavior ([4df5af9][53])

<br />

### 🏗️ Patch @-xun/api[@1.0.3][54] (2025-07-05)

#### 🪄 Fixes

- **packages/api:** fix cors handling ([a43b07d][55])
- **packages/api:** improve support for modern middleware ([d7c333f][56])

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([f86b6da][57])

<br />

### 🏗️ Patch @-xun/api[@1.0.2][58] (2025-07-03)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([9cd1af5][59])

<br />

### 🏗️ Patch @-xun/api[@1.0.1][60] (2025-07-03)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([d599bd6][61])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.10...@-xun/api@1.1.0
[4]: https://github.com/Xunnamius/api-utils/commit/30c5a3a3a39a239c61fa2d5f9cd0bc2c557b6947
[5]: https://github.com/Xunnamius/api-utils/commit/a40dcb825b413a4e7d9f24803444c83e1cd1d414
[6]: https://github.com/Xunnamius/api-utils/commit/bbc570546e732b6e12cd0906bc615889abeee25d
[7]: https://github.com/Xunnamius/api-utils/commit/a30bf7d131fc211e9d0e8df82d859ef09d7a4489
[8]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.1.3...@-xun/api@1.1.4
[9]: https://github.com/Xunnamius/api-utils/commit/91ea75dfeafbf2b38816ee52fb200fd84b73ec14
[10]: https://github.com/Xunnamius/api-utils/commit/95e944c79ea48481c20ffdc80237c85e69ae2917
[11]: https://github.com/Xunnamius/api-utils/commit/251f9b3ee1fe91c2720287964ca4f561372ce0a6
[12]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.1.2...@-xun/api@1.1.3
[13]: https://github.com/Xunnamius/api-utils/commit/f6eeabc397007b30efb787d284ba8eb6eae21d41
[14]: https://github.com/Xunnamius/api-utils/commit/515619399aa9d2f8409a027c3aeffe25b359703c
[15]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.1.1...@-xun/api@1.1.2
[16]: https://github.com/Xunnamius/api-utils/commit/8611a80c32c84d869e6f8afad74bcf763a5b7d3b
[17]: https://github.com/Xunnamius/api-utils/commit/f7a886abc80a98664e5c982bfc103f65aa35b07a
[18]: https://github.com/Xunnamius/api-utils/commit/be3157f4b648eef20b64c8557ee7b2f51fd250c0
[19]: https://github.com/Xunnamius/api-utils/commit/a285bb039f172d64b39a4d987887d245f6dfb68b
[20]: https://github.com/Xunnamius/api-utils/commit/54b005f0e00ebd5fc9d1e96f3f7c4006cd11edd4
[21]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.1.0...@-xun/api@1.1.1
[22]: https://github.com/Xunnamius/api-utils/commit/60863c4db4ba817b2926c481da6a42f07a7c9992
[23]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@0.0.0-init...@-xun/api@1.0.0
[24]: https://github.com/Xunnamius/api-utils/commit/5585ea57aa67c979523ec530243ab41d89ed5961
[25]: https://github.com/Xunnamius/api-utils/commit/c4afda0d61461e2b8dbcd661149b30468970d4eb
[26]: https://github.com/Xunnamius/api-utils/commit/4616e2ae80d6d3bce050b940e4676a500ab6af1b
[27]: https://github.com/Xunnamius/api-utils/commit/47aa438b6e2fa7eafca197bd09da4c9971b3c552
[28]: https://github.com/Xunnamius/api-utils/commit/49ac95a31e0bee5f9dee84ee70041edf855c2277
[29]: https://github.com/Xunnamius/api-utils/commit/dd43caf0e5d04049aa699f225be601c9952cb596
[30]: https://github.com/Xunnamius/api-utils/commit/ad3e99709163d81914d87de39a452ddad00e77b9
[31]: https://github.com/Xunnamius/api-utils/commit/bbee847846ea7aea6b822dc90669b88000adcba8
[32]: https://github.com/Xunnamius/api-utils/commit/5dfce1e73feac3dc40d1dbf743ce9af406dbb386
[33]: https://github.com/Xunnamius/api-utils/commit/89abbe6937ec39fc9d2eb19430d0e8d5b1321810
[34]: https://github.com/Xunnamius/api-utils/commit/604757a04c1246bf80c15a6caaa0e98300681eba
[35]: https://github.com/Xunnamius/api-utils/commit/71b4768957b597ca1b5c617189c9042977d621ab
[36]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.9...@-xun/api@1.0.10
[37]: https://github.com/Xunnamius/api-utils/commit/950450e08a4c8df133b79bd7c039ff99a5f57f73
[38]: https://github.com/Xunnamius/api-utils/commit/833bd12cadd6c7992213605876d54192f67a01bb
[39]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.8...@-xun/api@1.0.9
[40]: https://github.com/Xunnamius/api-utils/commit/7c2849cd446b80e4b0e2edf2a14bd3e5aebaa481
[41]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.7...@-xun/api@1.0.8
[42]: https://github.com/Xunnamius/api-utils/commit/dbaeec5232ae7bafbae84bb215ebf52b4fa76133
[43]: https://github.com/Xunnamius/api-utils/commit/9a91a529c23a378062d730c3b3e11a72d817bbf0
[44]: https://github.com/Xunnamius/api-utils/commit/e975dccb945ac2d92d089721cf97cebc39449791
[45]: https://github.com/Xunnamius/api-utils/commit/5028ad8e947cfce3aaaa9ba92abdfa71d5078967
[46]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.6...@-xun/api@1.0.7
[47]: https://github.com/Xunnamius/api-utils/commit/e54f00bd22821c4a3bb2bb3ee43d97edd4f401b8
[48]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.5...@-xun/api@1.0.6
[49]: https://github.com/Xunnamius/api-utils/commit/b76dd9ce0c2f50b330ae9c85d99704442be6f0bd
[50]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.4...@-xun/api@1.0.5
[51]: https://github.com/Xunnamius/api-utils/commit/2e722d034f9cb0ae52b9bcfca02dfa6ae9de0080
[52]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.3...@-xun/api@1.0.4
[53]: https://github.com/Xunnamius/api-utils/commit/4df5af90e8c8c183b6b76a3742f17a8028208836
[54]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.2...@-xun/api@1.0.3
[55]: https://github.com/Xunnamius/api-utils/commit/a43b07d9c7bde1fd369f583f8592e9f5cbe4c101
[56]: https://github.com/Xunnamius/api-utils/commit/d7c333f400df0a05008510842532ddd95e9fc938
[57]: https://github.com/Xunnamius/api-utils/commit/f86b6da3746432264ea1e1b00e1751b0fe171fe2
[58]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.1...@-xun/api@1.0.2
[59]: https://github.com/Xunnamius/api-utils/commit/9cd1af53c9f08bf74ac71b1f8924f654c5cc5c2f
[60]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.0...@-xun/api@1.0.1
[61]: https://github.com/Xunnamius/api-utils/commit/d599bd64b164b6e85a698e3eb503c87928b45e16
