const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    static associate(models) {
      // define association here
    }
  }
  Recipes.init({
    title: DataTypes.STRING,
    extendedIngredients: DataTypes.ARRAY(DataTypes.JSON),
    image: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    readyInMinutes: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Recipes',
  });
  return Recipes;
};
