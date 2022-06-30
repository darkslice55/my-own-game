const questionRouter = require('express').Router();

//const { Question } = require('../db/models'); Подключаемся к базе и получает юзеров

// выдает вопрос без ответа 
////////////
questionRouter.get('/question', (req, res) => {
  try {
    const id = req.body.id
    // const question = Question.findawait Question.findAll({ where: { theme_id: Number(id) })
    res.status(200)
    res.json(question)
  } catch (error) {
    console.log(error);
    res.status(418).end()
  }

});
///// Проверяет правильность ответа
questionRouter.put('/question:id', (req, res) => {
  try {
    const game_id = req.session.gameId;
    const question_id = req.body.id;
    const user_id = req.session.userId;
    console.log(req.body);
  /// Запрашивает вопрос в бд
  /// Сравнивает ответ
  /// Записывает результат в GameQuestion
  /// Отправляет Правельный ответ и результат True или False
    // res.status(200)
    // res.json('ok')
  } catch (error) {
    console.log(error);
    res.status(418).end()
  }

});



module.exports = questionRouter;
