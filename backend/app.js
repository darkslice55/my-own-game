require('@babel/register');
require('dotenv').config();
const express = require('express');
const expressConfig = require('./config/express');
const { sequelize } = require('./db/models');

// импорт роутеров
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/users.router');
const gamesRouter = require('./routes/games.router');
const questionRouter = require('./routes/question.router');
// инициализация приложения
const app = express();

const PORT = process.env.PORT ?? 4000;

// функция настройки экспресса
expressConfig(app);

// подключаем роутеры
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/games', gamesRouter);
app.use('/question', questionRouter);
app.get('*', (req, res) => {
  res.send('Страница не найдена');
});

app.listen(PORT, async () => {
  /* eslint-disable no-console */
  console.log('Веб-сервер слушает порт', PORT);

  try {
    await sequelize.authenticate();
    console.log('БД-сервер подключен успешно');
  } catch (error) {
    console.log('БД-сервер не подключен');
    console.log(error.message);
  }
  /* eslint-enable */
});
