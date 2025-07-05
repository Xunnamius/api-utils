import { ErrorMessage } from 'universe+api-strategy:error.ts';
import { getCommonDummyData } from 'universe+api-strategy:mongo/dummy.ts';
import { getCommonSchemaConfig } from 'universe+api-strategy:mongo/index.ts';

describe('::getCommonSchemaConfig', () => {
  it('returns an object with dummy root schema and additional dummy schema', async () => {
    expect.hasAssertions();

    expect(
      getCommonSchemaConfig({
        databases: { someDb: { collections: [] } },
        aliases: {}
      })
    ).toStrictEqual({
      databases: {
        root: expect.toBeObject(),
        someDb: expect.toBeObject()
      },
      aliases: {}
    });

    expect(
      getCommonSchemaConfig({
        databases: { someDb: { collections: [] } },
        aliases: { 'my-alias': 'someDb' }
      })
    ).toStrictEqual({
      databases: {
        root: expect.toBeObject(),
        someDb: expect.toBeObject()
      },
      aliases: { 'my-alias': 'someDb' }
    });
  });

  it('throws if an alias references a non-existent database name', async () => {
    expect.hasAssertions();

    expect(() =>
      getCommonSchemaConfig({
        databases: { someDb: { collections: [] } },
        aliases: { app: 'badDb' }
      })
    ).toThrow(
      ErrorMessage.AliasedDatabaseNotAliasable('badDb', 'app', ['root', 'someDb'])
    );
  });

  it('throws if an alias itself conflicts with a database name', async () => {
    expect.hasAssertions();

    expect(() =>
      getCommonSchemaConfig({
        databases: { someDb: { collections: [] } },
        aliases: { someDb: 'root' }
      })
    ).toThrow(ErrorMessage.InvalidDatabaseAlias('root', 'someDb'));
  });
});

describe('::getCommonDummyData', () => {
  it('returns an object with dummy root data and additional dummy data', async () => {
    expect.hasAssertions();

    const customDummyData = { someDb: { _generatedAt: 123 } };

    expect(getCommonDummyData(customDummyData)).toStrictEqual({
      root: expect.toBeObject(),
      someDb: expect.toBeObject()
    });
  });
});
