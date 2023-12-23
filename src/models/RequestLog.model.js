import { DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Adjust the path based on your project structure

const RequestLog = sequelize.define('RequestLog', {
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
});

export default RequestLog;
