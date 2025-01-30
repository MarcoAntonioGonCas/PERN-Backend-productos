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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestQuery = exports.validateRequestParams = exports.validateRequestBody = void 0;
const zod_1 = require("zod");
const validate = (schema, source) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.parseAsync(req[source]);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.z.ZodError) {
                res.status(400).json({
                    message: `Invalid ${source} schema`,
                    errors: err.errors,
                });
            }
            else {
                next(err);
            }
        }
    });
};
const validateRequestBody = (schema) => {
    return validate(schema, 'body');
};
exports.validateRequestBody = validateRequestBody;
const validateRequestParams = (schema) => {
    return validate(schema, 'params');
};
exports.validateRequestParams = validateRequestParams;
const validateRequestQuery = (schema) => {
    return validate(schema, 'query');
};
exports.validateRequestQuery = validateRequestQuery;
//# sourceMappingURL=validator-schema.middleware.js.map