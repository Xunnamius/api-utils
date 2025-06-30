import { createDebugLogger } from 'rejoinder';

/**
 * The project-wide namespace that appears in debugger output.
 */
export const globalDebuggerNamespace = 'xapi';

export const globalDebugLogger = createDebugLogger({
  namespace: globalDebuggerNamespace
});
