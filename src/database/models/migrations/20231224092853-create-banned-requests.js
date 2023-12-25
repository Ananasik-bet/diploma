module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('"BannedRequest"', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      method: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      headers: {
        type: Sequelize.JSONB,
      },
      query: {
        type: Sequelize.JSONB,
      },
      params: {
        type: Sequelize.JSONB,
      },
      body: {
        type: Sequelize.JSONB,
      },
      ip_address: {
        type: Sequelize.STRING,
      },
      reason: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('"BannedRequest"');
  },
};
