// app.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const routerCards = require('./routes/cards'); // импортируем роутер
const routerUsers = require('./routes/users'); // импортируем роутер
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err'); // 404
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { enableCors, preReqCors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env; // eslint-disable-line no-unused-vars
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(requestLogger); // подключаем логгер запросов до всех обработчиков роутов

app.use(enableCors); // Разрешаем доступ с определённых источников CORS
app.use(preReqCors); // Обрабатываем предварительные запросы CORS

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }),
}), createUser);

app.use(auth); // авторизация

app.use('/', routerUsers); // запускаем
app.use('/', routerCards); // запускаем
app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger); // логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
// централизованно обрабатываем все ошибки
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`); // eslint-disable-line no-console
// });
