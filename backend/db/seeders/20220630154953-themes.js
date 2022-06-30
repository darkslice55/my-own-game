'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Themes', [{
       title: 'Твин Пикс',
       createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      title: 'Футбол',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Вопросы от эльбрусовцев',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('Themes', null, { restartIdentity: true, truncate: true });
     
  }
};
