import { Person, Queries } from '../database';
import { catchAsyncError, PeopleController } from '.';

export const makePeopleController = (queries: Queries): PeopleController => {
  return {
    getAllPeople: catchAsyncError(async (req, res) => {
      const users = await queries.getAllPeople();
      res.send(users);
    }),
    addPerson: catchAsyncError(async (req, res) => {
      const person = Person.parse(req.body);
      const newPerson = await queries.addPerson(person);
      res.send(newPerson);
    }),
  };
};
