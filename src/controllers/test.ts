import { TestController } from '.';

export const makeTestController = (): TestController => {
  return {
    hello: (req, res) => {
      res.send('Hello World!');
    },
  };
};
