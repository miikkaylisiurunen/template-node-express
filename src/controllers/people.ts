import { Person, Queries } from '../database';
import { PeopleController } from '.';

export const makePeopleController = (queries: Queries): PeopleController => {
  return {
    getAllPeople: async (req, res) => {
      try {
        const users = await queries.getAllPeople();
        res.send(users);
      } catch (error) {
        // temporary error handling
        res.status(500).send({ error: 'Something went wrong' });
      }
    },
    addPerson: async (req, res) => {
      try {
        const person = Person.parse(req.body);
        const newPerson = await queries.addPerson(person);
        res.send(newPerson);
      } catch (error) {
        // temporary error handling
        res.status(500).send({ error: 'Something went wrong' });
      }
    },
  };
};
