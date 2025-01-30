"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFirstAndLastPage = exports.calculatePage = void 0;
const calculatePage = (pageIndex, pageSize) => {
    const offset = (pageIndex - 1) * pageSize;
    const limit = pageSize;
    return { offset, limit };
};
exports.calculatePage = calculatePage;
const calculateFirstAndLastPage = (totalItems, pageSize) => {
    // Math.ceil() devuelve el entero mayor o igual más cercano a un número dado.
    const totalPages = Math.ceil(totalItems / pageSize);
    const firstPage = 1;
    const lastPage = totalPages;
    return { totalPages, firstPage, lastPage };
};
exports.calculateFirstAndLastPage = calculateFirstAndLastPage;
//# sourceMappingURL=pageUtils.js.map