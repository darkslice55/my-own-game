require('@babel/register');
require('dotenv').config();
const express = require('express');
const expressConfig = require('./config/express');
const { sequelize } = require('./db/models');

// импорт роутеров
const authRouter = require('./routes/auth.routes');
// инициализация приложения
const app = express();

const PORT = process.env.PORT ?? 3000;

// функция настройки экспресса
expressConfig(app);

// подключаем роутеры
app.use('/auth', authRouter);
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
