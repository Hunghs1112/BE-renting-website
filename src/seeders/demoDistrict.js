"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "District",
      [
        {
          district_name: "Ba Đình",
        },
        {
          district_name: "Đống Đa",
        },
        {
          district_name: "Hai Bà Trưng",
        },
        {
          district_name: "Tây Hồ",
        },
        {
          district_name: "Cầu Giấy",
        },
        {
          district_name: "Thanh Xuân",
        },
        {
          district_name: "Hoàng Mai",
        },
        {
          district_name: "Long Biên",
        },
        {
          district_name: "Hà Đông",
        },
        {
          district_name: "Bắc Từ Liêm",
        },
        {
          district_name: "Nam Từ Liêm",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
