module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('request_logs', {
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
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('request_logs');
  },
};
