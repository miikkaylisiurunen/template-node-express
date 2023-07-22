import { NextFunction, Request, RequestHandler, Response } from 'express';

// wrapper function for async express middleware that will automatically call `next` on error
// avoids the need to use try/catch on every middleware
export function catchAsyncError(
  fn: RequestHandler,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}
