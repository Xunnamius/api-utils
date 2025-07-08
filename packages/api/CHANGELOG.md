# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## @-xun/api[@1.0.0][3] (2025-07-03)

### ✨ Features

- **packages/shared:** add `getAuthorizationHeaderFromRequestLike` shared export ([5585ea5][4])
- **packages:** land initial re-implementation of @-xun/api ([c4afda0][5])

### 🪄 Fixes

- **packages/api:** do not return Response in legacy mode ([4616e2a][6])
- **packages/api:** ignore attempts to set runtime response to non-Response type ([47aa438][7])
- **packages/shared:** fix next-like type guards, add tests ([49ac95a][8])

### ⚙️ Build System

- Add `/error` package entry point ([dd43caf][9])
- **deps:** bump @-xun/mongo-schema from 1.1.2 to 1.1.3 ([ad3e997][10])
- **deps:** bump @-xun/mongo-schema from 1.1.3 to 1.1.4 ([bbee847][11])
- **deps:** bump internal monorepo interdependencies to latest versions ([5dfce1e][12])
- Force publish from latest checkpoint ([89abbe6][13])
- **packages/api:** fix exports paths ([604757a][14])
- **packages/shared:** use the full `NextApiRequest` and `NextApiResponse` types without importing Next.js ([71b4768][15])

<br />

### 🏗️ Patch @-xun/api[@1.0.9][16] (2025-07-08)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([7c2849c][17])

<br />

### 🏗️ Patch @-xun/api[@1.0.8][18] (2025-07-08)

#### 🪄 Fixes

- **packages/api:** integrate latest @-xun/error fixes ([dbaeec5][19])

#### ⚙️ Build System

- **deps:** bump core-js from 3.43.0 to 3.44.0 ([9a91a52][20])
- **deps:** bump internal monorepo interdependencies to latest versions ([e975dcc][21])
- **deps:** bump internal monorepo interdependencies to latest versions ([5028ad8][22])

<br />

### 🏗️ Patch @-xun/api[@1.0.7][23] (2025-07-07)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([e54f00b][24])

<br />

### 🏗️ Patch @-xun/api[@1.0.6][25] (2025-07-07)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([b76dd9c][26])

<br />

### 🏗️ Patch @-xun/api[@1.0.5][27] (2025-07-06)

#### 🪄 Fixes

- **packages/api:** fix several bugs; improve test coverage to 100% with 100% passing ([2e722d0][28])

<br />

### 🏗️ Patch @-xun/api[@1.0.4][29] (2025-07-06)

#### 🪄 Fixes

- **packages/api:** improve error handling behavior ([4df5af9][30])

<br />

### 🏗️ Patch @-xun/api[@1.0.3][31] (2025-07-05)

#### 🪄 Fixes

- **packages/api:** fix cors handling ([a43b07d][32])
- **packages/api:** improve support for modern middleware ([d7c333f][33])

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([f86b6da][34])

<br />

### 🏗️ Patch @-xun/api[@1.0.2][35] (2025-07-03)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([9cd1af5][36])

<br />

### 🏗️ Patch @-xun/api[@1.0.1][37] (2025-07-03)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([d599bd6][38])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@0.0.0-init...@-xun/api@1.0.0
[4]: https://github.com/Xunnamius/api-utils/commit/5585ea57aa67c979523ec530243ab41d89ed5961
[5]: https://github.com/Xunnamius/api-utils/commit/c4afda0d61461e2b8dbcd661149b30468970d4eb
[6]: https://github.com/Xunnamius/api-utils/commit/4616e2ae80d6d3bce050b940e4676a500ab6af1b
[7]: https://github.com/Xunnamius/api-utils/commit/47aa438b6e2fa7eafca197bd09da4c9971b3c552
[8]: https://github.com/Xunnamius/api-utils/commit/49ac95a31e0bee5f9dee84ee70041edf855c2277
[9]: https://github.com/Xunnamius/api-utils/commit/dd43caf0e5d04049aa699f225be601c9952cb596
[10]: https://github.com/Xunnamius/api-utils/commit/ad3e99709163d81914d87de39a452ddad00e77b9
[11]: https://github.com/Xunnamius/api-utils/commit/bbee847846ea7aea6b822dc90669b88000adcba8
[12]: https://github.com/Xunnamius/api-utils/commit/5dfce1e73feac3dc40d1dbf743ce9af406dbb386
[13]: https://github.com/Xunnamius/api-utils/commit/89abbe6937ec39fc9d2eb19430d0e8d5b1321810
[14]: https://github.com/Xunnamius/api-utils/commit/604757a04c1246bf80c15a6caaa0e98300681eba
[15]: https://github.com/Xunnamius/api-utils/commit/71b4768957b597ca1b5c617189c9042977d621ab
[16]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.8...@-xun/api@1.0.9
[17]: https://github.com/Xunnamius/api-utils/commit/7c2849cd446b80e4b0e2edf2a14bd3e5aebaa481
[18]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.7...@-xun/api@1.0.8
[19]: https://github.com/Xunnamius/api-utils/commit/dbaeec5232ae7bafbae84bb215ebf52b4fa76133
[20]: https://github.com/Xunnamius/api-utils/commit/9a91a529c23a378062d730c3b3e11a72d817bbf0
[21]: https://github.com/Xunnamius/api-utils/commit/e975dccb945ac2d92d089721cf97cebc39449791
[22]: https://github.com/Xunnamius/api-utils/commit/5028ad8e947cfce3aaaa9ba92abdfa71d5078967
[23]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.6...@-xun/api@1.0.7
[24]: https://github.com/Xunnamius/api-utils/commit/e54f00bd22821c4a3bb2bb3ee43d97edd4f401b8
[25]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.5...@-xun/api@1.0.6
[26]: https://github.com/Xunnamius/api-utils/commit/b76dd9ce0c2f50b330ae9c85d99704442be6f0bd
[27]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.4...@-xun/api@1.0.5
[28]: https://github.com/Xunnamius/api-utils/commit/2e722d034f9cb0ae52b9bcfca02dfa6ae9de0080
[29]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.3...@-xun/api@1.0.4
[30]: https://github.com/Xunnamius/api-utils/commit/4df5af90e8c8c183b6b76a3742f17a8028208836
[31]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.2...@-xun/api@1.0.3
[32]: https://github.com/Xunnamius/api-utils/commit/a43b07d9c7bde1fd369f583f8592e9f5cbe4c101
[33]: https://github.com/Xunnamius/api-utils/commit/d7c333f400df0a05008510842532ddd95e9fc938
[34]: https://github.com/Xunnamius/api-utils/commit/f86b6da3746432264ea1e1b00e1751b0fe171fe2
[35]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.1...@-xun/api@1.0.2
[36]: https://github.com/Xunnamius/api-utils/commit/9cd1af53c9f08bf74ac71b1f8924f654c5cc5c2f
[37]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.0...@-xun/api@1.0.1
[38]: https://github.com/Xunnamius/api-utils/commit/d599bd64b164b6e85a698e3eb503c87928b45e16
