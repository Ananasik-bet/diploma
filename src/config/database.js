import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath

dotenv.config();

// Convert the current module's URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory of the current module
const __dirname = path.dirname(__filename);

const updateDatabaseConfig = () => {
  const options = {
    development: {
      username: process.env.POSTGRES_USER || 'student',
      password: process.env.POSTGRES_PASSWORD || 'test',
      database: process.env.POSTGRES_DB || 'test',
      host: process.env.POSTGRES_HOST || '127.0.0.1',
      dialect: 'postgres',
      pool: {
        max: process.env.MAX_DB_CONNECTIONS || 10,
        idle: process.env.POSTGRES_CONNECTION_IDLE_TIME_MS || 30000,
      },
    },
    test: {
      username: process.env.POSTGRES_USER || 'student',
      password: process.env.POSTGRES_PASSWORD || 'test',
      database: process.env.POSTGRES_DB || 'test',
      host: process.env.POSTGRES_HOST || '127.0.0.1',
      dialect: 'postgres',
      pool: {
        max: process.env.MAX_DB_CONNECTIONS || 10,
        idle: process.env.POSTGRES_CONNECTION_IDLE_TIME_MS || 30000,
      },
    },
    production: {
      username: process.env.POSTGRES_USER || 'student',
      password: process.env.POSTGRES_PASSWORD || 'test',
      database: process.env.POSTGRES_DB || 'test',
      host: process.env.POSTGRES_HOST || '127.0.0.1',
      dialect: 'postgres',
      pool: {
        max: process.env.MAX_DB_CONNECTIONS || 10,
        idle: process.env.POSTGRES_CONNECTION_IDLE_TIME_MS || 30000,
      },
    }
  };

  fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(options));
  // eslint-disable-next-line no-console
  console.log('Postgres config updated');
};

updateDatabaseConfig();
