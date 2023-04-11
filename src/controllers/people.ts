import { Person, Queries } from '../database';
import { PeopleController } from '.';

export const makePeopleController = (queries: Queries): PeopleController => {
  return {
    getAllPeople: async (req, res, next) => {
      try {
        const users = await queries.getAllPeople();
        res.send(users);
      } catch (error) {
        next(error);
      }
    },
    addPerson: async (req, res, next) => {
      try {
        const person = Person.parse(req.body);
        const newPerson = await queries.addPerson(person);
        res.send(newPerson);
      } catch (error) {
        next(error);
      }
    },
  };
};
