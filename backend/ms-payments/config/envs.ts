import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  STRIPE_SECRET_KEY: string;
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
    STRIPE_SECRET_KEY: joi.string().required(),
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE_NAME: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  stripeSecretKey: envVars.STRIPE_SECRET_KEY,
  port: envVars.PORT,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbUsername: envVars.DB_USERNAME,
  dbPassword: envVars.DB_PASSWORD,
  dbDatabaseName: envVars.DB_DATABASE_NAME,
};
