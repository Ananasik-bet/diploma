const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BannedIP extends Model {
    static associate(models) {
      // define association here
    }
  }
  BannedIP.init(
    {
      ip_address: {
        type: DataTypes.STRING,
      },
      reason: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'BannedIP',
      tableName: 'BannedIP',
      timestamps: true,
    }
  );
  return BannedIP;
};
