import { createDebugLogger, createGenericLogger } from 'rejoinder';

/**
 * The project-wide namespace that appears in debugger output.
 */
export const globalNamespace = 'xapi';

export const globalGenericLogger = createGenericLogger({
  namespace: globalNamespace
});

export const globalDebugLogger = createDebugLogger({
  namespace: globalNamespace
});
