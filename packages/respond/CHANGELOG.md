# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## @-xun/respond[@1.1.0][3] (2025-07-01)

### ✨ Features

- **packages/shared:** add `getAuthorizationHeaderFromRequestLike` shared export ([5585ea5][4])

### 🪄 Fixes

- **packages/shared:** fix next-like type guards, add tests ([49ac95a][5])

### ⚙️ Build System

- Add `/error` package entry point ([dd43caf][6])

<br />

### 🏗️ Patch @-xun/respond[@1.1.3][7] (2025-07-08)

#### 🪄 Fixes

- **packages/respond:** override json "error" property for security sensitive values ([fd9774a][8])

<br />

### 🏗️ Patch @-xun/respond[@1.1.2][9] (2025-07-07)

#### 🪄 Fixes

- **packages/respond:** ensure error property can be overridden by caller ([2380af8][10])

<br />

### 🏗️ Patch @-xun/respond[@1.1.1][11] (2025-07-03)

#### ⚙️ Build System

- **packages/shared:** use the full `NextApiRequest` and `NextApiResponse` types without importing Next.js ([71b4768][12])

<br />

## @-xun/respond[@1.0.0][13] (2025-06-30)

### ⚙️ Build System

- Force publish from latest checkpoint ([89abbe6][14])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/api-utils/compare/@-xun/respond@1.0.0...@-xun/respond@1.1.0
[4]: https://github.com/Xunnamius/api-utils/commit/5585ea57aa67c979523ec530243ab41d89ed5961
[5]: https://github.com/Xunnamius/api-utils/commit/49ac95a31e0bee5f9dee84ee70041edf855c2277
[6]: https://github.com/Xunnamius/api-utils/commit/dd43caf0e5d04049aa699f225be601c9952cb596
[7]: https://github.com/Xunnamius/api-utils/compare/@-xun/respond@1.1.2...@-xun/respond@1.1.3
[8]: https://github.com/Xunnamius/api-utils/commit/fd9774abc70c3e3b99bbac312920b8cbed7ba017
[9]: https://github.com/Xunnamius/api-utils/compare/@-xun/respond@1.1.1...@-xun/respond@1.1.2
[10]: https://github.com/Xunnamius/api-utils/commit/2380af8d9957fce028eee89fa329ac3c196b60c1
[11]: https://github.com/Xunnamius/api-utils/compare/@-xun/respond@1.1.0...@-xun/respond@1.1.1
[12]: https://github.com/Xunnamius/api-utils/commit/71b4768957b597ca1b5c617189c9042977d621ab
[13]: https://github.com/Xunnamius/api-utils/compare/@-xun/respond@0.0.0-init...@-xun/respond@1.0.0
[14]: https://github.com/Xunnamius/api-utils/commit/89abbe6937ec39fc9d2eb19430d0e8d5b1321810
