const questionRouter = require('express').Router();

const { Game, Question, GameQuestion } = require('../db/models'); //Подключаемся к базе и получает юзеров

// выдает вопрос без ответа
////////////
questionRouter.get('/', async (req, res) => {
  try {
    const questions = await Question.findAll({
      raw: true,
      include: [Question.Theme],
    });
    if (!res.locals.gameId) {
      const game = await Game.create({
        user_id: Number(res.locals.user.id),
        total_score: 0,
        isFinished: false,
      });
      res.locals.gameId = game.id;
    }

    const answeredQuestions = await GameQuestion.findAll({
      raw: true,
      where: {
        game_id: res.locals.gameId,
      },
    });

    console.log(answeredQuestions);
    const filtredQuestions = questions.map((question) => {
      let isAnswered = false;
      let isRight = false;
      // console.log(question);
      // console.log(answeredQuestions.filter((que) => que.question_id === question.id));
      for (let que of answeredQuestions) {
        if (que.question_id === question.id) {
          isAnswered = true;
          isRight = que.isRight;
        }
      }
      const result = {
        id: question.id,
        description: question.description,
        score: question.score,
        theme: question['Theme.title'],
        isAnswered,
        isRight,
      };
      return result;
    });
    // console.log(filtredQuestions);
    res.status(200);
    res.json(filtredQuestions);
  } catch (error) {
    console.log(error);
    res.status(418).end();
  }
});
///// Проверяет правильность ответа
questionRouter.put('/:id', async (req, res) => {
  try {
    console.log(req.body);
    const game_id = res.locals.gameId;
    const idQuestion = req.params.id;
    const user_id = req.session.userId;
    const timer = req.body.timer;
    const anwer = req.body.answer;
    const question = await Question.findOne({ where: { id: idQuestion } });
    if (anwer === question.answer) {
      const gameQuestion = await GameQuestion.create({
        game_id: Number(game_id),
        question_id: idQuestion,
        isRight: true,
        time: Number(timer),
      });
      res.status(200);
      res.json({ anwer: question.answer, result: gameQuestion.isRight });
    } else {
      const gameQuestion = await GameQuestion.create({
        game_id: Number(game_id),
        question_id: idQuestion,
        isRight: false,
        time: Number(timer),
      });
      res.status(200);
      res.json({ answer: question.answer, result: gameQuestion.isRight });
    }

    /// Запрашивает вопрос в бд
    /// Сравнивает ответ
    /// Записывает результат в GameQuestion
    /// Отправляет Правельный ответ и результат True или False
  } catch (error) {
    console.log(error);
    res.status(418).end();
  }
});

// });

module.exports = questionRouter;
