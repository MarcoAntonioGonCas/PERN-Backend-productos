"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showSuccess = exports.showError = exports.showInfo = void 0;
const colors_1 = __importDefault(require("colors"));
const showMessage = (color, ...message) => {
    const messageJoin = message.map((m) => {
        return typeof m === 'string' ? m : JSON.stringify(m);
    }).join(' ');
    console.log(color(messageJoin));
};
const showInfo = (...message) => {
    showMessage(colors_1.default.blue.bold, ...message);
};
exports.showInfo = showInfo;
const showError = (...message) => {
    showMessage(colors_1.default.red.bold, ...message);
};
exports.showError = showError;
const showSuccess = (...message) => {
    showMessage(colors_1.default.green.bold, ...message);
};
exports.showSuccess = showSuccess;
//# sourceMappingURL=consoleUtil.js.map