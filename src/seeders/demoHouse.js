"use strict";

/** @type {import('sequelize-cli').Migration} */
// import { House } from '../models'; // Import model House
const { House } = require('../models'); // Import model House
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Tạo dữ liệu giả cho bảng houses
        await House.bulkCreate([
            {
                house_name: 'Luxury Villa',
                address: '123 Luxury Street, City',
                number_of_room: 5,
                image: 'https://medialibrarycfo.entrata.com/18981/MLv3/9/36/2024/04/15/123744/661d73f7dd1591.80951612569.png',
                average_rate: 4.8,
            },
            {
                house_name: 'Cozy Apartment',
                address: '456 Cozy Road, Downtown',
                number_of_room: 3,
                image: 'https://medialibrarycfo.entrata.com/18981/MLv3/9/36/2024/04/15/123744/661d73f7dd1591.80951612569.png',
                average_rate: 4.2,
            },
            {
                house_name: 'Modern House',
                address: '789 Modern Avenue, Suburb',
                number_of_room: 4,
                image: 'https://medialibrarycfo.entrata.com/18981/MLv3/9/36/2024/04/15/123744/661d73f7dd1591.80951612569.png',
                average_rate: 4.5,
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        // Xóa tất cả dữ liệu trong bảng houses (hoặc có thể thêm điều kiện xóa nếu cần)
        await queryInterface.bulkDelete('Houses', null, {});
    },
};