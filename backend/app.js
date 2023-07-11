/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const setError = require('./middlewares/setError');
const NotFoundError = require('./errors/not-found-err');
const { auth } = require('./middlewares/auth');
const limiter = require('./middlewares/limiter');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000, BASE_URL } = process.env;

mongoose
  .connect(BASE_URL)
  .then(() => {
    console.log(`Successfully connected on ${BASE_URL}`);
  })
  .catch((err) => {
    console.log(`Connection to database failed: ${err}`);
  });

const app = express();

app.use(express.json());

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(requestLogger);
app.use(cors);
app.use(helmet());
app.use(limiter);

app.use(routes);
app.use(auth);
app.use('/users/', userRoutes);
app.use('/cards/', cardRoutes);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());
app.use(setError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
