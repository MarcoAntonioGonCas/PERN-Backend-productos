"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationRequestSchema = exports.orderRequestSchema = exports.searchRequestSchema = void 0;
const zod_1 = require("zod");
exports.searchRequestSchema = zod_1.z.object({
    column: zod_1.z.string().nonempty(),
    value: zod_1.z.string().nonempty(),
});
exports.orderRequestSchema = zod_1.z.object({
    column: zod_1.z.string().nonempty(),
    dir: zod_1.z.enum(['ASC', 'DESC'])
});
exports.paginationRequestSchema = zod_1.z.object({
    pageIndex: zod_1.z.coerce.number().int().positive(),
    pageSize: zod_1.z.coerce.number().int().positive(),
    search: zod_1.z.array(exports.searchRequestSchema).optional(),
    order: zod_1.z.array(exports.orderRequestSchema).optional()
});
//# sourceMappingURL=pagination.schema.js.map