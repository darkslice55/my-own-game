const usersRouter = require('express').Router();

//const { User } = require('../db/models'); Подключаемся к базе и получает юзеров

//// Отправляет всю информацию по завершенным играм конктретного юзера
usersRouter.get('/users/:id', (req, res) => {
     //const user = await User.findOne({ where: { id: req.params.id }, include: [Product.User], raw: true });
     //Запрос в базу данных
     res.json(users)
});

module.exports = usersRouter;
