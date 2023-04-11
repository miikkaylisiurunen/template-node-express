import express from 'express';
import 'dotenv/config';
import testRouter from './routes/testRouter';

const app = express();
app.use(express.json());

app.use(testRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
