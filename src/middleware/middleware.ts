import { ZodError } from 'zod';
import { HttpError } from '../errors';
import { Middleware } from '.';

export const makeMiddleware = (): Middleware => {
  return {
    exampleLogger: (req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
      next();
    },
    // below warning is ignored because we need to have 3 arguments for express to recognize this as middleware
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    routeNotFound: (req, res, next) => {
      throw new HttpError(404, 'Route not found');
    },
    // below warning is ignored because we need to have 4 arguments for express to recognize this as an error handler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorHandler: (err, req, res, next) => {
      if (err instanceof HttpError) {
        return res.status(err.status).send({ status: err.status, message: err.message });
      } else if (err instanceof ZodError) {
        // request validation failure
        // can be improved with custom zod error messages
        return res.status(400).send({ status: 400, message: 'Invalid request' });
      } else {
        // catch-all handler
        // log unexpected errors
        console.log(
          `ERROR: ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - `,
          err,
        );
        return res.status(500).send({ status: 500, message: 'Something went wrong' });
      }
    },
  };
};
