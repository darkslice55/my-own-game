const authRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

authRouter.route('/register').post(
  [
    check('login', 'Логин должен быть введен и состоять из латинских символов')
      .matches(/[a-zA-Z]+/i)
      .isLength({
        min: 3,
      }),
    check('password', 'Пароль должен быть минимум 8 символов').isLength({
      min: 8,
    }),
  ],

  async (req, res) => {
    const { errors } = validationResult(req);
    console.log(errors);
    if (errors.length) {
      const message = errors.map((error) => error.msg).join('\n');
      res.json({ success: false, message });
      return;
    }
    const { login, password } = req.body;

    const existingUser = await User.findOne({ where: { login } });
    // проверяем есть ли уже такой пользователь в БД
    if (existingUser) {
      res.json({ success: false, message: 'Пользователь с такой почтой уже есть' });
      return;
    }

    // создаём нового пользователя
    const user = await User.create({
      login,
      // хэшируем пароль, чтобы не хранить в открытом виде в БД
      password: await bcrypt.hash(password, 10),
    });
    // кладём id нового пользователя в хранилище сессии (сразу логиним пользователя)
    res.json({ id: user.id, login: user.login });
  },
);

authRouter.route('/login').post(async (req, res) => {
  const { login, password } = req.body;
  const existingUser = await User.findOne({ where: { login } });

  // проверяем, что такой пользователь есть в БД и пароли совпадают
  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    // кладём id нового пользователя в хранилище сессии (логиним пользователя)
    req.session.userId = existingUser.id;
    // res.locals.user = existingUser;
    res.send({ id: existingUser.id, login: existingUser.login });
  } else {
    res.json({ success: false, message: 'Такого пользователя нет либо пароли не совпадают' });
  }
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  delete res.locals.user;
  delete res.locals.gameId;
  // res.redirect('/');
  res.send({ success: true });
});

module.exports = authRouter;
