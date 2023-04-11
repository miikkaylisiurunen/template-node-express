import { NextFunction, Request, Response } from 'express';

export interface TestController {
  hello(req: Request, res: Response, next: NextFunction): void;
}
