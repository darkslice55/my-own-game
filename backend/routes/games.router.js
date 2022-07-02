const gamesRouter = require('express').Router();

const { Game, GameQuestion, Question, User } = require('../db/models'); //Подключаемся к базе и получает юзеров

//// Создаем новую игру у пользоватетя
//// И закидываем в Сесию id игры
gamesRouter.post('/', async (req, res) => {
  try {
    const id = req.session.userId;
    const game = await Game.create({
      user_id: id,
      total_score: 0,
      isFinished: false,
    });
    res.locals.gameId = game.id;
    res.status(200);
    res.json(game);
  } catch (error) {
    console.log(error);
    res.status(418).end();
  }
});

gamesRouter.get('/', async (req, res) => {
  try {
    const gameId = res.locals.gameId;
    console.log(gameId);
    const game = await GameQuestion.findAll({
      raw: true,
      where: { game_id: gameId },
      include: [GameQuestion.Question],
    });
    const gameTrue = game.filter((obj) => obj.isRight === true);
    const gameFalse = game.filter((obj) => obj.isRight === false);
    const scoreTrue = gameTrue.reduce((acc, obj) => acc + obj['Question.score'], 0);
    const scoreFalse = gameFalse.reduce((acc, obj) => acc + obj['Question.score'], 0);
    const result = scoreTrue - scoreFalse;
    const findGame = await Game.findOne({ where: { id: gameId } });
    findGame.total_score = result;
    findGame.isFinished = true;
    await findGame.save();
    delete res.locals.gameId;
    res.status(200);
    res.json(findGame);
  } catch (error) {
    console.log(error);
    res.status(418).end();
  }
});
/// нужно сделать сложный поиск в GameQuestion для подсчета результата
/// вставить результат в игру и поставить флаг завершено

gamesRouter.get('/raitings', async (req, res) => {
  try {
    const id = req.session.userId;
    console.log(req.body);
    const game = await Game.findAll({
      raw: true,
      where: { isFinished: true },
      include: [Game.User],
      order: [['total_score', 'DESC']],
    });
    console.log(game);
    res.status(200);
    res.json(game);
  } catch (error) {
    console.log(error);
    res.status(418).end();
  }
});

module.exports = gamesRouter;
