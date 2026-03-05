const express = require('express');
const usersRouter = require('./routes/users');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(logger);

app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
