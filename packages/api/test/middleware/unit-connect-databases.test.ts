/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDb } from '@-xun/mongo-schema';
import { setupMemoryServerOverride } from '@-xun/mongo-test';
import { testApiHandler } from 'next-test-api-route-handler';

import { withMiddleware } from 'universe+api';
import { getCommonDummyData } from 'universe+api-strategy:mongo/dummy.ts';
import { getCommonSchemaConfig } from 'universe+api-strategy:mongo/index.ts';
import { ErrorMessage } from 'universe+api:error.ts';
import { makeMiddleware } from 'universe+api:middleware/connect-databases.ts';

import {
  legacyNoopHandler,
  modernNoopHandler,
  useMockDateNow,
  withLegacyConfig,
  withMockedEnv
} from 'testverse:util.ts';

import type { DbSchema } from '@-xun/mongo-schema';
import type { DummyData } from '@-xun/mongo-test';
import type { ModernMiddlewareContext, NextApiResponseLike } from 'universe+api';
import type { Context, Options } from 'universe+api:middleware/connect-databases.ts';

useMockDateNow();
const { initializeMemoryServerOverride, killMemoryServerOverride } =
  setupMemoryServerOverride({
    schema: { aliases: {}, databases: {} },
    data: {},
    defer: 'without-hooks'
  });

const fakeSchema: DbSchema = {
  databases: { 'fake-db': { collections: [{ name: 'fake-collection' }] } },
  aliases: {}
};

const fakeData: DummyData = {
  'fake-db': { _generatedAt: Date.now(), 'fake-collection': [{ item: 1 }, { item: 2 }] }
};

beforeEach(async () => {
  await initializeMemoryServerOverride();
});

afterEach(async () => {
  await killMemoryServerOverride();
});

describe('<legacy mode>', () => {
  it('sets db schema specifically when in production or development mode but does not hydrate database', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              options: {
                legacyMode: true,
                database: {
                  schema: () => fakeSchema,
                  data: () => fakeData
                }
              }
            })
          ),
          test: async ({ fetch }) => {
            await expect(fetch().then((r) => r.status)).resolves.toBe(200);

            const db = await getDb({ name: 'fake-db' });

            await expect(db.listCollections().toArray()).resolves.toStrictEqual([
              expect.objectContaining({ name: 'fake-collection' })
            ]);

            const collection = db.collection('fake-collection');

            await expect(collection.find().toArray()).resolves.toStrictEqual([]);
          }
        });
      },
      { NODE_ENV: 'production', MONGODB_URI: 'ignored://' }
    );
  });

  it('sets db schema and hydrates db when given API_HYDRATE_DB specifically in development mode', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              useOnError: [
                (_req, res, ctx) => {
                  const {
                    runtime: { error }
                  } = ctx!;

                  expect(error).toMatchObject({
                    message: ErrorMessage.ApiHydrateDbSucceeded()
                  });

                  (res as NextApiResponseLike).status(200).send({});
                }
              ],
              options: {
                legacyMode: true,
                database: {
                  hydrationTargets: ['root', 'fake-db'],
                  schema: () => getCommonSchemaConfig(fakeSchema),
                  data: () => getCommonDummyData(fakeData)
                }
              }
            })
          ),
          test: async ({ fetch }) => {
            await expect(fetch().then((r) => r.status)).resolves.toBe(200);

            const db = await getDb({ name: 'fake-db' });

            await expect(db.listCollections().toArray()).resolves.toStrictEqual([
              expect.objectContaining({ name: 'fake-collection' })
            ]);

            const collection = db.collection('fake-collection');

            await expect(collection.find().toArray()).resolves.toStrictEqual([
              expect.objectContaining({ _id: expect.anything(), item: 1 }),
              expect.objectContaining({ _id: expect.anything(), item: 2 })
            ]);
          }
        });
      },
      { NODE_ENV: 'development', API_HYDRATE_DB: 'true', MONGODB_URI: 'ignored://' }
    );
  });

  it('defaults hydrationTargets to "root" and "app"', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        await testApiHandler({
          rejectOnHandlerError: true,
          pagesHandler: withLegacyConfig(
            withMiddleware<Options, Context>(legacyNoopHandler, {
              descriptor: '/fake',
              use: [makeMiddleware()],
              useOnError: [
                (_req, res, ctx) => {
                  const {
                    runtime: { error }
                  } = ctx!;

                  expect(error).toMatchObject({
                    message: ErrorMessage.ApiHydrateDbSucceeded()
                  });

                  (res as NextApiResponseLike).status(200).send({});
                }
              ],
              options: {
                legacyMode: true,
                database: {
                  schema: () =>
                    getCommonSchemaConfig({
                      ...fakeSchema,
                      aliases: { app: 'fake-db' }
                    }),
                  data: () => getCommonDummyData(fakeData)
                }
              }
            })
          ),
          test: async ({ fetch }) => {
            await expect(fetch().then((r) => r.status)).resolves.toBe(200);

            const db = await getDb({ name: 'fake-db' });

            await expect(db.listCollections().toArray()).resolves.toStrictEqual([
              expect.objectContaining({ name: 'fake-collection' })
            ]);

            const collection = db.collection('fake-collection');

            await expect(collection.find().toArray()).resolves.toStrictEqual([
              expect.objectContaining({ _id: expect.anything(), item: 1 }),
              expect.objectContaining({ _id: expect.anything(), item: 2 })
            ]);
          }
        });
      },
      { NODE_ENV: 'development', API_HYDRATE_DB: 'true', MONGODB_URI: 'ignored://' }
    );
  });
});

describe('<modern mode>', () => {
  it('sets db schema specifically when in production or development mode but does not hydrate database', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        await testApiHandler({
          rejectOnHandlerError: true,
          appHandler: withMiddleware<Options, Context>(modernNoopHandler, {
            descriptor: '/fake',
            use: [makeMiddleware()],
            options: {
              database: {
                schema: () => fakeSchema,
                data: () => fakeData
              }
            }
          }),
          test: async ({ fetch }) => {
            await expect(fetch().then((r) => r.status)).resolves.toBe(200);

            const db = await getDb({ name: 'fake-db' });

            await expect(db.listCollections().toArray()).resolves.toStrictEqual([
              expect.objectContaining({ name: 'fake-collection' })
            ]);

            const collection = db.collection('fake-collection');

            await expect(collection.find().toArray()).resolves.toStrictEqual([]);
          }
        });
      },
      { NODE_ENV: 'production', MONGODB_URI: 'ignored://' }
    );
  });

  it('sets db schema and hydrates db when given API_HYDRATE_DB specifically in development mode', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        await testApiHandler({
          rejectOnHandlerError: true,
          appHandler: withMiddleware<Options, Context>(modernNoopHandler, {
            descriptor: '/fake',
            use: [makeMiddleware()],
            useOnError: [
              (_, ctx_) => {
                const ctx = ctx_ as ModernMiddlewareContext<any, any>;
                const {
                  runtime: { error }
                } = ctx;

                expect(error).toMatchObject({
                  message: ErrorMessage.ApiHydrateDbSucceeded()
                });

                // @ts-expect-error: reset
                ctx.runtime.response = null;
                return Response.json({}, { status: 200 });
              }
            ],
            options: {
              database: {
                hydrationTargets: ['root', 'fake-db'],
                schema: () => getCommonSchemaConfig(fakeSchema),
                data: () => getCommonDummyData(fakeData)
              }
            }
          }),
          test: async ({ fetch }) => {
            await expect(fetch().then((r) => r.status)).resolves.toBe(200);

            const db = await getDb({ name: 'fake-db' });

            await expect(db.listCollections().toArray()).resolves.toStrictEqual([
              expect.objectContaining({ name: 'fake-collection' })
            ]);

            const collection = db.collection('fake-collection');

            await expect(collection.find().toArray()).resolves.toStrictEqual([
              expect.objectContaining({ _id: expect.anything(), item: 1 }),
              expect.objectContaining({ _id: expect.anything(), item: 2 })
            ]);
          }
        });
      },
      { NODE_ENV: 'development', API_HYDRATE_DB: 'true', MONGODB_URI: 'ignored://' }
    );
  });

  it('defaults hydrationTargets to "root" and "app"', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      async () => {
        await testApiHandler({
          rejectOnHandlerError: true,
          appHandler: withMiddleware<Options, Context>(modernNoopHandler, {
            descriptor: '/fake',
            use: [makeMiddleware()],
            useOnError: [
              (_, ctx_) => {
                const ctx = ctx_ as ModernMiddlewareContext<any, any>;
                const {
                  runtime: { error }
                } = ctx;

                expect(error).toMatchObject({
                  message: ErrorMessage.ApiHydrateDbSucceeded()
                });

                // @ts-expect-error: reset
                ctx.runtime.response = null;
                return Response.json({}, { status: 200 });
              }
            ],
            options: {
              database: {
                schema: () =>
                  getCommonSchemaConfig({
                    ...fakeSchema,
                    aliases: { app: 'fake-db' }
                  }),
                data: () => getCommonDummyData(fakeData)
              }
            }
          }),
          test: async ({ fetch }) => {
            await expect(fetch().then((r) => r.status)).resolves.toBe(200);

            const db = await getDb({ name: 'fake-db' });

            await expect(db.listCollections().toArray()).resolves.toStrictEqual([
              expect.objectContaining({ name: 'fake-collection' })
            ]);

            const collection = db.collection('fake-collection');

            await expect(collection.find().toArray()).resolves.toStrictEqual([
              expect.objectContaining({ _id: expect.anything(), item: 1 }),
              expect.objectContaining({ _id: expect.anything(), item: 2 })
            ]);
          }
        });
      },
      { NODE_ENV: 'development', API_HYDRATE_DB: 'true', MONGODB_URI: 'ignored://' }
    );
  });
});
