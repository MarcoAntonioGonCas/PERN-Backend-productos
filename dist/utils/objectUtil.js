"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimObject = void 0;
const trimObject = (obj, { include = undefined, recursive = false } = {}) => {
    const newObject = Object.assign({}, obj);
    Object.keys(newObject).forEach((key) => {
        const includeIn = include ? include.includes(key) : true;
        if (!includeIn) {
            return;
        }
        const keyObj = key;
        const value = newObject[keyObj];
        if (typeof value === 'string') {
            newObject[keyObj] = value.trim();
        }
        if (recursive && typeof value === 'object' && value !== null && !Array.isArray(value)) {
            newObject[keyObj] = (0, exports.trimObject)(value, { include, recursive });
        }
    });
    return newObject;
};
exports.trimObject = trimObject;
//# sourceMappingURL=objectUtil.js.map