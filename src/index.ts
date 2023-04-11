import { makeApp } from './app';
import { getConfig } from './config';

async function main() {
  const config = getConfig();
  const app = makeApp();
  app.listen(config.port, () => {
    console.log(`Server is up on port ${config.port}`);
  });
}

main().catch((error) => {
  console.log(error);
});
