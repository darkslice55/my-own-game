const authRouter = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

authRouter.route('/register').post(
  [
    check(
      'login',
      'Логин должен быть введен и состоять из латинских символов, цифр или символов ".", "_" или "-"',
    )
      .matches(/[a-zA-Z0-9._-]+/i)
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

    const existingUser = await User.findOne({ where: { email } });
    // проверяем есть ли уже такой пользователь в БД
    if (existingUser) {
      res.json({ success: false, message: 'Пользователь с такой почтой уже есть' });
      return;
    }

    // создаём нового пользователя
    const user = await User.create({
      login,
      email,
      // хэшируем пароль, чтобы не хранить в открытом виде в БД
      password: await bcrypt.hash(password, 10),
    });
    // кладём id нового пользователя в хранилище сессии (сразу логиним пользователя)
    req.session.userId = user.id;
    res.locals.user = user;
    res.send({ success: true });
  },
);

authRouter.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });

  // проверяем, что такой пользователь есть в БД и пароли совпадают
  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    // кладём id нового пользователя в хранилище сессии (логиним пользователя)
    req.session.userId = existingUser.id;
    res.locals.user = existingUser;
    res.send({ success: true });
  } else {
    res.json({ success: false, message: 'Такого пользователя нет либо пароли не совпадают' });
  }
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  delete res.locals.user;
  res.redirect('/');
});

module.exports = authRouter;
