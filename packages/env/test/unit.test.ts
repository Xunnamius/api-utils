import { validHttpMethods } from '@-xun/types';

import { getEnv } from 'universe+env';
import { ErrorMessage } from 'universe+env:error.ts';

import { withMockedEnv } from 'testverse:util.ts';

describe('::getEnv', () => {
  it('returns object with respect to process.env', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      () => {
        expect(getEnv()).toStrictEqual({
          NODE_ENV: 'known',
          MONGODB_URI: 'uri',
          MONGODB_MS_PORT: 6666,
          API_HYDRATE_DB: false,
          DISABLED_API_VERSIONS: [],
          RESULTS_PER_PAGE: 5,
          IGNORE_RATE_LIMITS: false,
          LOCKOUT_ALL_CLIENTS: false,
          DISALLOWED_METHODS: [],
          MAX_CONTENT_LENGTH_BYTES: 1024,
          AUTH_HEADER_MAX_LENGTH: 500,
          DEBUG: undefined,
          DEBUG_INSPECTING: false,
          REQUESTS_PER_CONTRIVED_ERROR: 0
        });
      },
      {
        BABEL_ENV: 'known',
        MONGODB_URI: 'uri',
        RESULTS_PER_PAGE: '5',
        MAX_CONTENT_LENGTH_BYTES: '1KB'
      }
    );

    await withMockedEnv(() => {
      expect(() => getEnv()).toThrow(
        ErrorMessage.UnexpectedEmptyOrMissing('NODE_ENV', 'unknown')
      );
    }, {});

    await withMockedEnv(
      () => {
        expect(() => getEnv()).not.toThrow(
          ErrorMessage.UnexpectedEmptyOrMissing('MONGODB_URI', '')
        );
      },
      { NODE_ENV: 'test' }
    );

    await withMockedEnv(
      () => {
        expect(() => getEnv()).toThrow(
          ErrorMessage.UnexpectedEmptyOrMissing('MONGODB_URI', '')
        );
      },
      { NODE_ENV: 'production' }
    );
  });

  it('does not run validation if NODE_ENV is "test"', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      () => {
        expect(getEnv()).toStrictEqual({
          NODE_ENV: 'test',
          MONGODB_URI: 'uri',
          MONGODB_MS_PORT: 1234,
          API_HYDRATE_DB: true,
          DISABLED_API_VERSIONS: ['one', '2', 'three'],
          RESULTS_PER_PAGE: 5,
          IGNORE_RATE_LIMITS: false,
          LOCKOUT_ALL_CLIENTS: true,
          DISALLOWED_METHODS: ['FAKE'],
          MAX_CONTENT_LENGTH_BYTES: 1024,
          AUTH_HEADER_MAX_LENGTH: 50,
          DEBUG: 'false',
          DEBUG_INSPECTING: true,
          REQUESTS_PER_CONTRIVED_ERROR: 5
        });
      },
      {
        NODE_ENV: 'test',
        MONGODB_URI: 'uri',
        MONGODB_MS_PORT: '1234',
        API_HYDRATE_DB: 'defined',
        DISABLED_API_VERSIONS: 'one, 2, three',
        RESULTS_PER_PAGE: '5',
        IGNORE_RATE_LIMITS: 'false',
        LOCKOUT_ALL_CLIENTS: 'true',
        DISALLOWED_METHODS: 'FAKE',
        MAX_CONTENT_LENGTH_BYTES: '1KB',
        AUTH_HEADER_MAX_LENGTH: '50',
        DEBUG: 'false',
        VSCODE_INSPECTOR_OPTIONS: 'inspector',
        REQUESTS_PER_CONTRIVED_ERROR: '5',
        BLAH: 'blah blah'
      }
    );

    await withMockedEnv(
      () => {
        expect(() => getEnv()).toThrow();
      },
      {
        NODE_ENV: 'prod',
        MONGODB_URI: 'uri',
        MONGODB_MS_PORT: '1234',
        API_HYDRATE_DB: '',
        DISABLED_API_VERSIONS: 'one, 2, three',
        RESULTS_PER_PAGE: '5',
        IGNORE_RATE_LIMITS: 'false',
        LOCKOUT_ALL_CLIENTS: 'true',
        DISALLOWED_METHODS: 'FAKE',
        MAX_CONTENT_LENGTH_BYTES: '1KB',
        AUTH_HEADER_MAX_LENGTH: '50',
        DEBUG: 'false',
        VSCODE_INSPECTOR_OPTIONS: 'inspector',
        REQUESTS_PER_CONTRIVED_ERROR: '5',
        BLAH: 'blah blah'
      }
    );
  });

  it('throws on negative numbers', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      () => {
        expect(() => getEnv()).toThrow(
          ErrorMessage.UnexpectedNegativeNumber('RESULTS_PER_PAGE', -5)
        );
      },
      {
        NODE_ENV: 'development',
        MONGODB_URI: 'uri',
        MONGODB_MS_PORT: '1234',
        API_HYDRATE_DB: '',
        DISABLED_API_VERSIONS: 'one, 2, three',
        RESULTS_PER_PAGE: '-5',
        IGNORE_RATE_LIMITS: 'false',
        LOCKOUT_ALL_CLIENTS: 'true',
        DISALLOWED_METHODS: 'GET',
        MAX_CONTENT_LENGTH_BYTES: '1KB',
        AUTH_HEADER_MAX_LENGTH: '50',
        DEBUG: 'false',
        VSCODE_INSPECTOR_OPTIONS: 'inspector',
        REQUESTS_PER_CONTRIVED_ERROR: '5'
      }
    );
  });

  it('throws on invalid method', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      () => {
        expect(() => getEnv()).toThrow(
          ErrorMessage.UnknownHttpMethod('FAKE', validHttpMethods)
        );
      },
      {
        NODE_ENV: 'development',
        MONGODB_URI: 'uri',
        MONGODB_MS_PORT: '1234',
        API_HYDRATE_DB: '',
        DISABLED_API_VERSIONS: 'one, 2, three',
        RESULTS_PER_PAGE: '5',
        IGNORE_RATE_LIMITS: 'false',
        LOCKOUT_ALL_CLIENTS: 'true',
        DISALLOWED_METHODS: 'FAKE',
        MAX_CONTENT_LENGTH_BYTES: '1KB',
        AUTH_HEADER_MAX_LENGTH: '50',
        DEBUG: 'false',
        VSCODE_INSPECTOR_OPTIONS: 'inspector',
        REQUESTS_PER_CONTRIVED_ERROR: '5'
      }
    );
  });

  it('throws on bad mongo debug port', async () => {
    expect.hasAssertions();

    await withMockedEnv(
      () => {
        expect(() => getEnv()).toThrow(ErrorMessage.BadMongoMsPort());
      },
      {
        NODE_ENV: 'development',
        MONGODB_URI: 'uri',
        MONGODB_MS_PORT: '50',
        API_HYDRATE_DB: '',
        DISABLED_API_VERSIONS: 'one, 2, three',
        RESULTS_PER_PAGE: '5',
        IGNORE_RATE_LIMITS: 'false',
        LOCKOUT_ALL_CLIENTS: 'true',
        DISALLOWED_METHODS: 'GET',
        MAX_CONTENT_LENGTH_BYTES: '1KB',
        AUTH_HEADER_MAX_LENGTH: '50',
        DEBUG: 'false',
        VSCODE_INSPECTOR_OPTIONS: 'inspector',
        REQUESTS_PER_CONTRIVED_ERROR: '5'
      }
    );
  });
});
