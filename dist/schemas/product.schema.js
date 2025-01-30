"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availabilityProductSchema = exports.idProductParamsSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty(),
    price: zod_1.z.number().min(1, { message: "El precio debe ser mayor a 0" }),
    availability: zod_1.z.boolean().optional(),
});
exports.updateProductSchema = exports.createProductSchema.omit({ availability: true }).extend({
    id: zod_1.z.number(),
    availability: zod_1.z.boolean(),
});
exports.idProductParamsSchema = zod_1.z.object({
    id: zod_1.z.string()
        .transform((value) => Number(value)) // Convierte a número
        .refine((num) => num > 0, { message: "El id debe ser un número positivo" })
});
exports.availabilityProductSchema = zod_1.z.object({
    availability: zod_1.z.boolean(),
});
//# sourceMappingURL=product.schema.js.map