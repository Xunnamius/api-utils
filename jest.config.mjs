// @ts-check
'use strict';

import { deepMergeConfig } from '@-xun/symbiote/assets';
import { assertEnvironment, moduleExport } from '@-xun/symbiote/assets/jest.config.mjs';
import { createDebugLogger } from 'rejoinder';

const debug = createDebugLogger({ namespace: 'symbiote:config:jest' });

const config = deepMergeConfig(
  moduleExport({ derivedAliases: getJestAliases(), ...assertEnvironment() }),
  {
    // Any custom configs here will be deep merged with moduleExport's result
  }
);

export default config;

debug('exported config: %O', config);

function getJestAliases() {
  const extension = process.env.SYMBIOTE_TEST_JEST_TRANSPILED ? 'js' : 'ts';

  // ! These aliases are auto-generated by symbiote. Instead of modifying them
  // ! directly, consider regenerating aliases across the entire project with:
  // ! `npx symbiote project renovate --regenerate-assets --assets-preset ...`
  return {
    '^multiverse\\+api:(.+)$': '<rootDir>/packages/api/src/$1',
    '^multiverse\\+api\\x2derror:(.+)$': '<rootDir>/packages/api-error/src/$1',
    '^multiverse\\+api\\x2dstrategy:(.+)$': '<rootDir>/packages/api-strategy/src/$1',
    '^multiverse\\+env:(.+)$': '<rootDir>/packages/env/src/$1',
    '^multiverse\\+respond:(.+)$': '<rootDir>/packages/respond/src/$1',
    '^multiverse\\+shared:(.+)$': '<rootDir>/packages/shared/src/$1',
    '^multiverse\\+api$': `<rootDir>/packages/api/src/index.${extension}`,
    '^multiverse\\+api\\x2derror$': `<rootDir>/packages/api-error/src/index.${extension}`,
    '^multiverse\\+api\\x2dstrategy$': `<rootDir>/packages/api-strategy/src/index.${extension}`,
    '^multiverse\\+env$': `<rootDir>/packages/env/src/index.${extension}`,
    '^multiverse\\+respond$': `<rootDir>/packages/respond/src/index.${extension}`,
    '^multiverse\\+shared$': `<rootDir>/packages/shared/src/index.${extension}`,
    '^universe\\+api:(.+)$': '<rootDir>/packages/api/src/$1',
    '^universe\\+api\\x2derror:(.+)$': '<rootDir>/packages/api-error/src/$1',
    '^universe\\+api\\x2dstrategy:(.+)$': '<rootDir>/packages/api-strategy/src/$1',
    '^universe\\+env:(.+)$': '<rootDir>/packages/env/src/$1',
    '^universe\\+respond:(.+)$': '<rootDir>/packages/respond/src/$1',
    '^universe\\+shared:(.+)$': '<rootDir>/packages/shared/src/$1',
    '^universe\\+api$': `<rootDir>/packages/api/src/index.${extension}`,
    '^universe\\+api\\x2derror$': `<rootDir>/packages/api-error/src/index.${extension}`,
    '^universe\\+api\\x2dstrategy$': `<rootDir>/packages/api-strategy/src/index.${extension}`,
    '^universe\\+env$': `<rootDir>/packages/env/src/index.${extension}`,
    '^universe\\+respond$': `<rootDir>/packages/respond/src/index.${extension}`,
    '^universe\\+shared$': `<rootDir>/packages/shared/src/index.${extension}`,
    '^universe:(.+)$': '<rootDir>/src/$1',
    '^universe$': `<rootDir>/src/index.${extension}`,
    '^testverse\\+api:(.+)$': '<rootDir>/packages/api/test/$1',
    '^testverse\\+api\\x2derror:(.+)$': '<rootDir>/packages/api-error/test/$1',
    '^testverse\\+api\\x2dstrategy:(.+)$': '<rootDir>/packages/api-strategy/test/$1',
    '^testverse\\+env:(.+)$': '<rootDir>/packages/env/test/$1',
    '^testverse\\+respond:(.+)$': '<rootDir>/packages/respond/test/$1',
    '^testverse\\+shared:(.+)$': '<rootDir>/packages/shared/test/$1',
    '^testverse:(.+)$': '<rootDir>/test/$1',
    '^typeverse:(.+)$': '<rootDir>/types/$1',
    '^rootverse\\+api:(.+)$': '<rootDir>/packages/api/$1',
    '^rootverse\\+api\\x2derror:(.+)$': '<rootDir>/packages/api-error/$1',
    '^rootverse\\+api\\x2dstrategy:(.+)$': '<rootDir>/packages/api-strategy/$1',
    '^rootverse\\+env:(.+)$': '<rootDir>/packages/env/$1',
    '^rootverse\\+respond:(.+)$': '<rootDir>/packages/respond/$1',
    '^rootverse\\+shared:(.+)$': '<rootDir>/packages/shared/$1',
    '^rootverse:(.+)$': '<rootDir>/$1'
  };
}
