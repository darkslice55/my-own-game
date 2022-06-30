const gamesRouter = require('express').Router();

//const { Game } = require('../db/models'); Подключаемся к базе и получает юзеров

//// Создаем новую игру у пользоватетя
//// И закидываем в Сесию id игры
gamesRouter.post('/games', (req, res) => {
  try {
    const id = req.session.userId;
    // const game = await Game.create({
    //   user_id: id,
    //   total_score: 0,
    //   isFinished: false,
    // });
    req.session.gameId = game.id;
    res.status(game)
    res.json(users)
  } catch (error) {
    console.log(error);
    res.status(418).end()
  }

});


    /// нужно сделать сложный поиск в GameQuestion для подсчета результата
    /// вставить результат в игру и поставить флаг завершено

gamesRouter.put('/games/raitings', (req, res) => {
  try {
    const id = req.session.userId;
    console.log(req.body);
    // const game = await Game.findAll(user_id(req.session.userId));

    res.status(200)
    res.json(game)
  } catch (error) {
    console.log(error);
    res.status(418).end()
  }

});

module.exports = gamesRouter;
