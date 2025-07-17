require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error(err); // eslint-disable-line no-console
  res.status(500).json({ error: err.message });
});

async function start() {
  await sequelize.sync();
  app.listen(3000, () => console.log('Server running on port 3000')); // eslint-disable-line no-console
}

start();
