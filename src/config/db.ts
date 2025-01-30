import { Sequelize } from 'sequelize-typescript'
import { ENV } from './env';

const Db = new Sequelize({
  dialect:"postgres",
  host: ENV.POSTGRES_HOST,
  database: ENV.POSTGRES_DB,
  username: ENV.POSTGRES_USER,
  password: ENV.POSTGRES_PASSWORD,
  dialectOptions:{
    ssl:true
  },
  models:[__dirname + "/../entities/**/*"],
  logging: false
})

export default Db;