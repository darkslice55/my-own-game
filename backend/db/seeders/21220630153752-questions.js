'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Questions', [{
      theme_id: 1,
      description: 'Назовите идеальное сочетание к чертовски хорошему кофе по мнению Дэйла Купера',
      answer: 'Вишневый пирог',
      score: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      },
    {
      theme_id: 1,
      description: 'Кому принадлежит слующая цитата: "Открою тебе маленький секрет. Каждый день, раз в день, делай себе маленький подарок. Не планируй заранее, не жди его, просто пусть он случается. Это может быть новая рубашка или послеобеденный сон в кабинете, или две чашки хорошего, горячего, черного кофе."',
      answer: 'Дэйлу Куперу',
      score: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 1,
      description: 'В работе над первыми двумя сезонами (1990-1991 года) было задействовано около сотни актеров. Часть из них отказалась принимать участие в съемках нового сезона (2017 год), а некоторые попросту уже умерли. Сколько же актеров из основного состава создателям удалось вернуть? 19, 29, 39 или 49?',
      answer: 39,
      score: 300,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 1,
      description: 'Правда или ложь? Изначально телесериал должен был называться «Северо-западный пассаж»',
      answer: 'Правда',
      score: 400,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 1,
      description: 'Многие знают эту героиню как "Дама с поленом", но сможете ли вы вспомнить настоящее имя и фамилию персоонажа?',
      answer: 'Маргарет Лантерман',
      score: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 2,
      description: 'В какой стране придумали футбол?',
      answer: 'В Aнглии',
      score: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 2,
      description: 'Назовите профессиональный клуб, в котором дебютировал Криштиану Роналду',
      answer: 'Спортинг',
      score: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 2,
      description: 'Карпин Валерий Георгиевич был тренером 4х клубов из них Спартак, Мальорка, Торпедо (Армавир) и .......  Назовите 4й футбольный клуб.',
      answer: 'Ростов',
      score: 300,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 2,
      description: 'В финале чемпионат мира по футболу 2006 года этот футболист был удален за грубое нарушение. Он ударил головой в грудь капитана соперников. Назовите его фамилию',
      answer: 'Зидан',
      score: 400,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 2,
      description: '14 мая 2008 Зенит играл в Финале Лиги Европы с Рейнджерс. Назовите фамилию футболиста, забившего решающий мяч в составе Зенита на 94 минуте',
      answer: 'Зырянов',
      score: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 3,
      description: 'Вопрос от Санчоуса 3я фаза. Какая колбаса самая пахучая?',
      answer: 'Краковская',
      score: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 3,
      description: 'Вопрос от Черепавла 2я фаза. На какой улице находятся Эльбрус в Мск?',
      answer: 'Орджоникидзе',
      score: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 3,
      description: 'Вопрос от Любы 1я фаза. В каком городе застрелили Лермонтова?',
      answer: ' В Пятигорске',
      score: 300,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 3,
      description: 'Вопрос от Евгения 2я фаза. Что общего между стройкой и Евгением?',
      answer: 'Уровень',
      score: 400,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme_id: 3,
      description: 'Вопрос от Коли (тайм-кодик) 3я фаза. Как называлась верстка в 2000 году?',
      answer: 'Табличная',
      score: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.bulkDelete('Questions', null, {restartIdentity: true, truncate: true });
     
  }
};
