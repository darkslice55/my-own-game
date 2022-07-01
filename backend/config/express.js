const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const reactSsrMiddleware = require('../middlewares/reactSsr');
const addUser = require('../middlewares/addUser');
const morgan = require('morgan');


// Конфигурация сессии
const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'G(8x>|Ai^"+&', // Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

function expressConfig(app) {
  // позволяет запрашивать статический контент
  // (файлы, которые лежат в / public) с нашего сервера
  app.use(express.static(`${__dirname}/../public`));
  // при отправке формы методом POST данные из формы приходят
  // не сервер в зашифрованном виде
  // эта миддлварка расшифровывает их и кладёт в req.body
  app.use(express.urlencoded({ extended: true }));
  // расшифровывает json, который отправляется в запросах от клиента
  app.use(express.json());
  // миддлварка для работы с сессиями
  app.use(session(sessionConfig));
  // наша миддлварка для добавления информации о текущем пользователе во все ручки
  app.use(addUser);
  // наша миддлварка для более компактного кода рендеринга
  app.use(reactSsrMiddleware);
  app.use(morgan('dev'));
}

module.exports = expressConfig;
