import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';

const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config', 'database.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

// Import all models
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && file.endsWith('.model.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    db[model.name] = model;
  });

// Initialize models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
