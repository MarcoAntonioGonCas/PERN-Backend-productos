"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./models/server"));
const consoleUtil_1 = require("./utils/consoleUtil");
const server = new server_1.default();
server.start(() => {
    (0, consoleUtil_1.showSuccess)(`[server] Servidor corriendo en el puerto ${server.port}`);
});
//# sourceMappingURL=index.js.map