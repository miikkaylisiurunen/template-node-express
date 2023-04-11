import { z } from 'zod';

export const Person = z.object({
  name: z.string().trim().min(1),
  age: z.number().positive().max(150),
});
export type Person = z.infer<typeof Person>;

export interface Queries {
  getAllPeople(): Promise<Person[]>;
  addPerson({ name, age }: Person): Promise<Person>;
}
