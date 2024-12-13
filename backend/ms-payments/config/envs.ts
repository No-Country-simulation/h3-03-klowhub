import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  STRIPE_SECRET_KEY: string;
  PORT: number;
}

const envsSchema = joi
  .object({
    STRIPE_SECRET_KEY: joi.string().required(),
    PORT: joi.number().required(),
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
};
