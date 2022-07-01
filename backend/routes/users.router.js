const usersRouter = require('express').Router();

const { Game } = require('../db/models'); //Подключаемся к базе и получает юзеров

//// Отправляет всю информацию по завершенным играм конктретного юзера
usersRouter.get('/', async(req, res) => {
     //const user = await User.findOne({ where: { id: req.params.id }, include: [Product.User], raw: true });
     //Запрос в базу данных
     try {
      const id = req.session.userId;
      const allGamesUsers = await Game.findAll({ 
       raw: true,
       where: {isFinished: true, user_id: id},
       include: [Game.User],
       order: [
         ['total_score', 'DESC'],
       ],
     });
     res.status(200)
      res.json(allGamesUsers)
     } catch (error) {
      console.log(error);
      res.status(418).end()
     }
 
});

module.exports = usersRouter;
