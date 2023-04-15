import { NextFunction, Request, Response } from 'express';

export interface ErrorBody {
  status: number;
  message: string;
}

export interface Middleware {
  exampleLogger(req: Request, res: Response, next: NextFunction): void;
  errorHandler(err: Error, req: Request, res: Response<ErrorBody>, next: NextFunction): Response;
  routeNotFound(req: Request, res: Response, next: NextFunction): void;
}
