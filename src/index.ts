import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import testRouter from '@/routes/testRouter';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.use(testRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
