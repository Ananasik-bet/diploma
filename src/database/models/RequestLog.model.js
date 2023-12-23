const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RequestLog extends Model {
    static associate(models) {
      // define association here
    }
  }
  RequestLog.init(
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
    },
    {
      sequelize,
      modelName: 'RequestLog',
      tableName: 'RequestLog',
      timestamps: true,
    }
  );
  return RequestLog;
};
