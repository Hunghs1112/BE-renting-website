"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // define association here
      House.hasMany(models.Comment, {
        foreignKey: "house_id",
        as: "comments",
      });

      House.hasMany(models.Image, { foreignKey: "house_id", as: "images" });
      House.hasOne(models.Utilities, {
        foreignKey: "house_id",
        as: "Utilities",
        onDelete: "CASCADE",
      });
    }
  }
  House.init(
    {
      house_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      house_name: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      area: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      number_of_room: DataTypes.INTEGER,
      average_rate: DataTypes.FLOAT,
      utilities: DataTypes.STRING,
      description: DataTypes.STRING,
      owner_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "House",
    }
  );
  return House;
};
