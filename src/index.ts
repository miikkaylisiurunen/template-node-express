import 'dotenv/config';
import { makeApp } from './app';

async function main() {
  const app = makeApp();
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  });
}

main().catch((error) => {
  console.log(error);
});
