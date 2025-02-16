"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Room", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      area: {
        type: Sequelize.INTEGER,
      },
      cost: {
        type: Sequelize.INTEGER,
      },
      average_rate: {
        type: Sequelize.FLOAT,
      },
      utilities: {
        type: Sequelize.JSON,
      },
      description: {
        type: Sequelize.STRING,
      },
      house_id: {  // Thêm trường house_id
        type: Sequelize.INTEGER,
        references: {
          model: 'House',  // Tên bảng House 
          key: 'house_id', // Khóa chính của bảng House
        },
        allowNull: false,  // Đảm bảo không để null cho khóa ngoại
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Room");
  },
};
