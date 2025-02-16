"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Mỗi room thuộc về một house
      // Trong models/room.js
      // Room.belongsToMany(models.House, { through: models.HouseRoom, foreignKey: 'room_id', as: 'houses' });

      // Mỗi room có thể có nhiều comments
      // Room.hasMany(models.Comment, { foreignKey: 'room_id', as: 'comments' });

    }
  }
  Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      area: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      average_rate: DataTypes.FLOAT,
      utilities: DataTypes.JSON,
      description: DataTypes.STRING,
      house_id: {  // Thêm trường house_id 
        type: DataTypes.INTEGER,
        references: {
          model: 'House',
          key: 'house_id',
        },
      },
    },
    {
      sequelize,
      modelName: "Room",
      timestamps: false, // Vô hiệu hóa createdAt và updatedAt
    }
  );

  return Room;
};
