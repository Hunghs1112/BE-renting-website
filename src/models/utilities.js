"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Utilities extends Model {
    static associate(models) {
      // Mỗi nhà có một tiện ích
      Utilities.belongsTo(models.House, {
        foreignKey: "house_id",
        as: "house",
        onDelete: "CASCADE", //XÓA NHÀ THÌ TIỆN ÍCH XÓA THEO
      }); 
    }
  }

  Utilities.init(
    {
      utilities_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      house_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      floors: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      security: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fire_protection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      parking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      camera: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Utilities",
      tableName: "utilities",
      timestamps: false,
    }
  );

  return Utilities;
};
