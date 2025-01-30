"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env;
exports.ENV = {
    POSTGRES_HOST: env.POSTGRES_HOST,
    POSTGRES_USER: env.POSTGRES_USER,
    POSTGRES_PASSWORD: env.POSTGRES_PASSWORD,
    POSTRGES_PORT: env.POSTGRES_PORT,
    POSTGRES_DB: env.POSTGRES_DB,
    FRONTED_URL: env.FRONTED_URL,
};
//# sourceMappingURL=env.js.map