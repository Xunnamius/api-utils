// * These tests ensure the exported interfaces under test function as expected.

import { ApiError, AuthError } from 'universe+api-error';

it('exports functional errors', async () => {
  expect.hasAssertions();
  expect(ApiError.isError(new AuthError())).toBeTrue();
});
