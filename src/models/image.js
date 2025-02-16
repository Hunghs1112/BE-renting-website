"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.House, {
        foreignKey: "house_id",
        as: "house",
      });
    }
  }
  Image.init(
    {
      house_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      images: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Image",
      timestamps: false,
    }
  );
  return Image;
};
