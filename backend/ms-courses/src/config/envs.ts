import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE_NAME: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().optional(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE_NAME: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

const EnvVars: EnvVars = value;

export const envs = {
  port: EnvVars.PORT,
  databaseUrl: EnvVars.DATABASE_URL,
  dbHost: EnvVars.DB_HOST,
  dbPort: EnvVars.DB_PORT,
  dbUsername: EnvVars.DB_USERNAME,
  dbPassword: EnvVars.DB_PASSWORD,
  dbDatabaseName: EnvVars.DB_DATABASE_NAME,
};
