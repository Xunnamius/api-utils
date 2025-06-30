/**
 * Returns whatever the ArkType package exports after configuring ArkType's
 * "jitless" setting.
 *
 * Invoking this function should be the only way ArkType is ever imported
 * anywhere else in this code base.
 *
 * @see https://arktype.io/docs/configuration#jitless
 */
export async function getArktype() {
  const { configure: configureArktype } = await import('arktype/config');

  configureArktype({
    // ? Stop Arktype from trying to use eval with npx wrangler dev
    jitless: true,
    onUndeclaredKey: 'reject'
  });

  return import('arktype');
}
