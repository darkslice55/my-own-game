const gamesRouter = require('express').Router();

const { Game, GameQuestion, Question} = require('../db/models'); //Подключаемся к базе и получает юзеров

//// Создаем новую игру у пользоватетя
//// И закидываем в Сесию id игры
gamesRouter.post('/', async(req, res) => {
  try {
    console.log('Я тут');
    const id = req.session.userId;
    const game = await Game.create({
      user_id: id, //Нужно заменить на id юзера!!!!!!!!
      total_score: 0,
      isFinished: false,
    });
    req.session.gameId = game.id;
    res.status(200)
    res.json(game)
  } catch (error) {
    console.log(error);
    res.status(418).end()
  }

});

gamesRouter.put('/', async(req, res) => {
  try {
    const gameId = req.session.gameId;
    console.log(gameId);
    const game = await GameQuestion.findAll({ 
      raw: true,
      where: {game_id: gameId},
      include: [GameQuestion.Question],
    });
    const gameTrue = game.filter((obj) =>obj.isRight === true)
    const gameFalse = game.filter((obj) =>obj.isRight === false)
    const scoreTrue = gameTrue.reduce((acc, obj) => acc + obj["Question.score"], 0)
    const scoreFalse = gameFalse.reduce((acc, obj) => acc + obj["Question.score"], 0)
    const result = scoreTrue - scoreFalse;
    const findGame = await Game.findOne({ where: {id: gameId}});
    findGame.total_score = result;
    await findGame.save();

    res.status(200)
    res.json(findGame)
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
