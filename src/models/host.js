"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Host extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Host.belongsToMany(models.House, { through: models.HostHouse, foreignKey: 'host_id' });
    }
  }
  Host.init(
    {
      host_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
      createAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Host",
      
    }
  );
  return Host;
};
