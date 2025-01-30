"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const env_1 = require("./env");
const Db = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    host: env_1.ENV.POSTGRES_HOST,
    database: env_1.ENV.POSTGRES_DB,
    username: env_1.ENV.POSTGRES_USER,
    password: env_1.ENV.POSTGRES_PASSWORD,
    dialectOptions: {
        ssl: true
    },
    models: [__dirname + "/../entities/**/*"],
    logging: false
});
exports.default = Db;
//# sourceMappingURL=db.js.map