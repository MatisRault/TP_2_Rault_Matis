require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const usersRouter = require('./routes/users');
const logger = require('./middleware/logger');

connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(logger);

app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
