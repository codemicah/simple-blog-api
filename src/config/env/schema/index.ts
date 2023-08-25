import { Joi } from "celebrate";

// define validation for all the env vars
export const schema = {
  PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
};
