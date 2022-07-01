'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Game, Question}) {
      GameQuestion.Game = GameQuestion.belongsTo(Game, {foreignKey: 'game_id'});
      GameQuestion.Question = GameQuestion.belongsTo(Question, {foreignKey: 'question_id'});
    }
  }
  GameQuestion.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    game_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    question_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    isRight: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    time: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'GameQuestion',
  });
  return GameQuestion;
};
