const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    login: DataTypes.STRING,
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    password: DataTypes.STRING,
    favourite: DataTypes.ARRAY(DataTypes.INTEGER),
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
