import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_URL: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE_NAME: string;
  JWT_SECRET: string;
  MS_USERS_ENDPOINT: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_URL: joi.string().optional(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE_NAME: joi.string().required(),
    MS_USERS_ENDPOINT: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbUrl: envVars.DB_URL,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbUsername: envVars.DB_USERNAME,
  dbPassword: envVars.DB_PASSWORD,
  dbDatabaseName: envVars.DB_DATABASE_NAME,
  msUsersEndpoint: envVars.MS_USERS_ENDPOINT
};
