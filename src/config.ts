import * as dotenv from 'dotenv';

export const config = () => {
  dotenv.config({ path: '.env' });
  return {
    database: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.host_connect),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: ['dist/**/*.entity.js'],
    },
  };
};
