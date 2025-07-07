// * These tests ensure the exported interfaces under test function as expected.

import { AuthError, isApiError } from 'universe+api-error';

it('exports functional errors', async () => {
  expect.hasAssertions();
  expect(isApiError(new AuthError())).toBeTrue();
});
