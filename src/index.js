const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./database/mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
