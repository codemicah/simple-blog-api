import dotenv from "dotenv";
import { schema } from "./schema";
import { Validate } from "./validators";
import { ConfigTypes } from "../types";
dotenv.config();

// validate environment variables
const envVarsSchema = Validate(schema);

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

export const config: ConfigTypes = {
  PORT: envVariables.PORT,
  DB_USER: envVariables.DB_USER,
  DB_PASSWORD: envVariables.DB_PASSWORD,
  DB_NAME: envVariables.DB_NAME,
  DB_HOST: envVariables.DB_HOST,
};
