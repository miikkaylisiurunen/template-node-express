import { NextFunction, Request, Response } from 'express';

export interface PeopleController {
  getAllPeople(req: Request, res: Response, next: NextFunction): Promise<void>;
  addPerson(req: Request, res: Response, next: NextFunction): Promise<void>;
}
