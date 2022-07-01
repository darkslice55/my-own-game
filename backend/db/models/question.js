'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Theme, GameQuestion }) {
      Question.Theme = Question.belongsTo(Theme, { foreignKey: 'theme_id' });
      Question.GameQuestions = Question.hasMany(GameQuestion, { foreignKey: 'question_id' });
    }
  }
  Question.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      theme_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Themes',
          key: 'id',
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      answer: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      score: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Question',
    },
  );
  return Question;
};
