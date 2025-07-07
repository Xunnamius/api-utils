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

### 🏗️ Patch @-xun/api[@1.0.7][16] (2025-07-07)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([e54f00b][17])

<br />

### 🏗️ Patch @-xun/api[@1.0.6][18] (2025-07-07)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([b76dd9c][19])

<br />

### 🏗️ Patch @-xun/api[@1.0.5][20] (2025-07-06)

#### 🪄 Fixes

- **packages/api:** fix several bugs; improve test coverage to 100% with 100% passing ([2e722d0][21])

<br />

### 🏗️ Patch @-xun/api[@1.0.4][22] (2025-07-06)

#### 🪄 Fixes

- **packages/api:** improve error handling behavior ([4df5af9][23])

<br />

### 🏗️ Patch @-xun/api[@1.0.3][24] (2025-07-05)

#### 🪄 Fixes

- **packages/api:** fix cors handling ([a43b07d][25])
- **packages/api:** improve support for modern middleware ([d7c333f][26])

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([f86b6da][27])

<br />

### 🏗️ Patch @-xun/api[@1.0.2][28] (2025-07-03)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([9cd1af5][29])

<br />

### 🏗️ Patch @-xun/api[@1.0.1][30] (2025-07-03)

#### ⚙️ Build System

- **deps:** bump internal monorepo interdependencies to latest versions ([d599bd6][31])

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
[16]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.6...@-xun/api@1.0.7
[17]: https://github.com/Xunnamius/api-utils/commit/e54f00bd22821c4a3bb2bb3ee43d97edd4f401b8
[18]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.5...@-xun/api@1.0.6
[19]: https://github.com/Xunnamius/api-utils/commit/b76dd9ce0c2f50b330ae9c85d99704442be6f0bd
[20]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.4...@-xun/api@1.0.5
[21]: https://github.com/Xunnamius/api-utils/commit/2e722d034f9cb0ae52b9bcfca02dfa6ae9de0080
[22]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.3...@-xun/api@1.0.4
[23]: https://github.com/Xunnamius/api-utils/commit/4df5af90e8c8c183b6b76a3742f17a8028208836
[24]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.2...@-xun/api@1.0.3
[25]: https://github.com/Xunnamius/api-utils/commit/a43b07d9c7bde1fd369f583f8592e9f5cbe4c101
[26]: https://github.com/Xunnamius/api-utils/commit/d7c333f400df0a05008510842532ddd95e9fc938
[27]: https://github.com/Xunnamius/api-utils/commit/f86b6da3746432264ea1e1b00e1751b0fe171fe2
[28]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.1...@-xun/api@1.0.2
[29]: https://github.com/Xunnamius/api-utils/commit/9cd1af53c9f08bf74ac71b1f8924f654c5cc5c2f
[30]: https://github.com/Xunnamius/api-utils/compare/@-xun/api@1.0.0...@-xun/api@1.0.1
[31]: https://github.com/Xunnamius/api-utils/commit/d599bd64b164b6e85a698e3eb503c87928b45e16
