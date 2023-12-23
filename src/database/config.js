if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  const fs = require('fs');
  const path = require('path');
  
  const connectionStringToObject = (str) => {
    // eslint-disable-next-line no-useless-escape
    const parsedString = str.match(/^postgres:\/\/([a-zA-Z0-9]+):([a-zA-Z0-9]+)@([\w-\.]+):(\d+)\/(\w+)$/);
  
    const dialectOptions = {
      rejectUnauthorized: false
    };
  
    const result = {
      'username': parsedString[1],
      'password': parsedString[2],
      'database': parsedString[5],
      'host': parsedString[3],
      'dialect': 'postgres',
      logging: false,
      pool: {
        max: +MAX_DB_CONNECTIONS || 10,
        idle: PSQL_CONNECTION_IDLE_TIME_MS || 30000,
      },
      dialectOptions: {
        ssl: (!PSQL_REQUIRE_SSL || PSQL_REQUIRE_SSL === 'true') ? dialectOptions : false
      },
    };
  
    if (Object.values(result).includes(undefined)) {
      return null;
    }
  
    return result;
  };
  
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    LOGGING_PSQL,
    MAX_DB_CONNECTIONS,
    PSQL_CONNECTION_IDLE_TIME_MS,
    POSTGRES_TEST_DB,
    PSQL_HOST,
    PSQL_REQUIRE_SSL,
    DATABASE_URL,
  } = process.env;
  
  const logging = LOGGING_PSQL && LOGGING_PSQL === 'true'? console.log : false;
  
  const updateDatabaseConfig = () => {
    const options = {
      development: {
        username: POSTGRES_USER || 'student',
        password: POSTGRES_PASSWORD || 'test',
        database: POSTGRES_DB || 'test',
        host: PSQL_HOST || '127.0.0.1',
        dialect: 'postgres',
        logging,
        pool: {
          max: +MAX_DB_CONNECTIONS || 10,
          idle: PSQL_CONNECTION_IDLE_TIME_MS || 30000,
        },
      },
      test: {
        username: POSTGRES_USER || 'student',
        password: POSTGRES_PASSWORD || 'test',
        database: POSTGRES_TEST_DB || 'test',
        host: PSQL_HOST || '127.0.0.1',
        dialect: 'postgres'
      },
      production: DATABASE_URL ? connectionStringToObject(DATABASE_URL) : {
        username: 'root',
        password: null,
        database: 'test',
        host: PSQL_HOST || '127.0.0.1',
        dialect: 'postgres',
        logging: false,
        pool: {
          max: +MAX_DB_CONNECTIONS || 10,
          idle: PSQL_CONNECTION_IDLE_TIME_MS || 30000,
        },
      },
    };
  
    fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(options));
    // eslint-disable-next-line no-console
    console.log('Postgres config updated');
  };
  
  updateDatabaseConfig();