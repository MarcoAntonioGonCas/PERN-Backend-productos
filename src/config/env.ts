import doten from 'dotenv';


doten.config();

const env = process.env;



export const ENV = {
  POSTGRES_HOST: env.POSTGRES_HOST as string,
  POSTGRES_USER: env.POSTGRES_USER as string,
  POSTGRES_PASSWORD: env.POSTGRES_PASSWORD as string,
  POSTRGES_PORT: env.POSTGRES_PORT as string,
  POSTGRES_DB: env.POSTGRES_DB as string,
  FRONTED_URL: env.FRONTED_URL as string,
}