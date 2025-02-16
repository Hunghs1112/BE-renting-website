"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HostHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HostHouse.init(
    {
      host_id: DataTypes.INTEGER,
      house_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HostHouse",
      
    }
  );
  return HostHouse;
};
