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
      "Client",
      [
        {
          email: "dduccraft@gmail.com",
          phone: "035310295",
          password: "123123",
          gender: "male",
          username: "Anh Duc",
        },
        {
          email: "nguyenvietanh98@gmail.com",
          phone: "0353101231231",
          password: "123123",
          gender: "male",
          username: "Viet Anh",
        },
        {
          email: "hlam123123@gmail.com",
          phone: "035310295",
          password: "123123",
          gender: "male",
          username: "Lam Nguyen",
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


