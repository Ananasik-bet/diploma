const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BannedRequest extends Model {
    static associate(models) {
      // define association here
    }
  }
  BannedRequest.init(
    {
      method: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
      headers: {
        type: DataTypes.JSONB,
      },
      query: {
        type: DataTypes.JSONB,
      },
      params: {
        type: DataTypes.JSONB,
      },
      body: {
        type: DataTypes.JSONB,
      },
      ip_address: {
        type: DataTypes.STRING,
      },
      reason: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: 'BannedRequest',
      tableName: 'BannedRequest',
      timestamps: true,
    }
  );
  return BannedRequest;
};
