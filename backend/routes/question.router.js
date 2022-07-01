const questionRouter = require('express').Router();

const { Question } = require('../db/models'); //Подключаемся к базе и получает юзеров

// выдает вопрос без ответа
////////////
questionRouter.get('/', async (req, res) => {
  try {
    const id = req.body.id;
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
// questionRouter.put('/question:id', (req, res) => {
//   try {
//     const game_id = req.session.gameId;
//     const question_id = req.body.id;
//     const user_id = req.session.userId;
//     console.log(req.body);
//   /// Запрашивает вопрос в бд
//   /// Сравнивает ответ
//   /// Записывает результат в GameQuestion
//   /// Отправляет Правельный ответ и результат True или False
//     // res.status(200)
//     // res.json('ok')
//   } catch (error) {
//     console.log(error);
//     res.status(418).end()
//   }

// });

module.exports = questionRouter;
