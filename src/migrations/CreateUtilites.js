"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Utilities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      house_id: {
        // Thêm mối quan hệ trực tiếp tới House
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      numberOfBedroom: {
        type: Sequelize.INTEGER,
      },
      numberOfFloor: {
        type: Sequelize.INTEGER,
      },
      numberOfBathroom: {
        type: Sequelize.INTEGER,
      },
      security: {
        type: Sequelize.BOOLEAN,
      },
      pccc: {
        type: Sequelize.BOOLEAN,
      },
      parking: {
        type: Sequelize.BOOLEAN,
      },
      camera: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Utilities");
  },
};
