"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const process_1 = require("process");
const clearDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.sync({ force: true });
        console.log("Database cleared");
        (0, process_1.exit)(0);
    }
    catch (error) {
        console.error(error);
        (0, process_1.exit)(1);
    }
});
if (process.argv.includes('--clear')) {
    clearDB();
}
//# sourceMappingURL=index.js.map