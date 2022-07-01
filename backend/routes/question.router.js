const questionRouter = require('express').Router();

const { Question, GameQuestion } = require('../db/models'); //Подключаемся к базе и получает юзеров

// выдает вопрос без ответа
////////////
questionRouter.get('/', async (req, res) => {
  try {
    const questions = await Question.findAll({
      raw: true,
      include: [Question.Theme],
    });
    // console.log(questions);
    const filtredQuestions = questions.map((question) => ({
      id: question.id,
      description: question.description,
      score: question.score,
      theme: question['Theme.title'],
      isAnswered: false,
    }));
    // console.log(filtredQuestions);
    res.status(200);
    res.json(filtredQuestions);
  } catch (error) {
    console.log(error);
    res.status(418).end();
  }
});
///// Проверяет правильность ответа
questionRouter.put('/:id', async(req, res) => {
  try {
    const game_id = res.locals.gameId;
    const idQuestion = req.params.id;
    const user_id = req.session.userId;
    const timer = req.body.timer
    const anwer = req.body.answer;
    const question = await Question.findOne({ where: {id: idQuestion}})
    if(anwer === question.answer) {
      const gameQuestion = await GameQuestion.create({
        game_id: Number(game_id), 
        question_id: idQuestion,
        isRight: true,
        time: Number(timer)
      });
      res.status(200)
      res.json({anwer: question.answer, result: gameQuestion.isRight})
    } else {
      const gameQuestion = await GameQuestion.create({
        game_id: Number(game_id), 
        question_id: idQuestion,
        isRight: false,
        time: Number(timer)
      });
      res.status(200)
      res.json({anwer: question.answer, result: gameQuestion.isRight})
    }
  
    /// Запрашивает вопрос в бд
  /// Сравнивает ответ
  /// Записывает результат в GameQuestion
  /// Отправляет Правельный ответ и результат True или False
  } catch (error) {
    console.log(error);
    res.status(418).end()
  }

});


// });

module.exports = questionRouter;
