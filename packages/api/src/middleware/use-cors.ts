import Cors from 'cors';
import { createDebugLogger } from 'rejoinder';

import type { Options as CheckMethodOptions } from '@-xun/adhesive/check-method';
import type { MiddlewareContext } from '@-xun/api-glue';

const debug = createDebugLogger('next-adhesive:use-cors');

export type Options = {
  allowedMethods?: CheckMethodOptions['allowedMethods'];
};

/**
 * Allows _cross-origin_ requests for the most popular request types. **Note
 * that this can be dangerous (huge security hole) and should only be used for
 * public APIs**.
 *
 * When present, this should be among the very first middleware in the chain and
 * certainly before _check-method_.
 *
 * By default, allowed CORS methods are: `GET`, `HEAD`, `PUT`, `PATCH`, `POST`,
 * and `DELETE`.
 */
export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
  context: MiddlewareContext<Options>
) {
  debug('entered middleware runtime');

  const cors = Cors({ methods: context.options.allowedMethods });
  await new Promise((resolve, reject) =>
    cors(req, res, (error) => (error ? reject(error) : resolve(undefined)))
  );
}
