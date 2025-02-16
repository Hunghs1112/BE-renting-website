// migrations/20250121-create-comment-house.js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CommentHouse', {
      comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // references: {
        //   model: 'Comment',  // Tên bảng Comment trong cơ sở dữ liệu
        //   key: 'comment_id',
        // },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      house_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // references: {
        //   model: 'House',  // Tên bảng House trong cơ sở dữ liệu
        //   key: 'house_id',
        // },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CommentHouse');
  },
};
