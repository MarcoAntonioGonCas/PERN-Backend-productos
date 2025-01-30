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
exports.deleteProduct = exports.patchProductAvailability = exports.updateProduct = exports.getProductById = exports.createProduct = exports.getProducts = exports.getProductsPaginated = void 0;
const product_schema_1 = require("../schemas/product.schema");
const Product_1 = __importDefault(require("../entities/Product"));
const pagination_schema_1 = require("../schemas/pagination.schema");
const pageUtils_1 = require("../utils/pageUtils");
const consoleUtil_1 = require("../utils/consoleUtil");
const sequelize_1 = require("sequelize");
const objectUtil_1 = require("../utils/objectUtil");
const getProductsPaginated = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageIndex, pageSize, order = [], search = [] } = pagination_schema_1.paginationRequestSchema.parse(req.query);
    const permitedFieldsOrderSearch = [
        'name',
        'price',
        'availability',
        'createdAt',
    ];
    const { offset, limit } = (0, pageUtils_1.calculatePage)(pageIndex, pageSize);
    const whereFilter = search.filter((s) => permitedFieldsOrderSearch.includes(s.column))
        .map((s) => ({ [s.column]: { [sequelize_1.Op.substring]: s.value } }));
    const orderQuery = order.filter((o) => permitedFieldsOrderSearch.includes(o.column));
    (0, consoleUtil_1.showInfo)('whereFilter', whereFilter);
    const productsFilter = yield Product_1.default.findAll({
        limit,
        offset,
        order: orderQuery.length > 0 ?
            orderQuery.map(o => [o.column, o.dir]) :
            ['createdAt'],
        where: whereFilter
    });
    const totalItems = yield Product_1.default.count();
    const totalItemsFiltered = productsFilter.length;
    const { totalPages, firstPage, lastPage } = (0, pageUtils_1.calculateFirstAndLastPage)(totalItems, pageSize);
    const response = {
        statusCode: 200,
        data: {
            pageIndex,
            pageSize,
            totalItems,
            totalFiltered: totalItemsFiltered,
            totalPages,
            firstPage,
            lastPage,
            items: productsFilter
        }
    };
    res.json(response);
});
exports.getProductsPaginated = getProductsPaginated;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.findAll();
        const response = {
            statusCode: 200,
            data: products
        };
        res.json(response);
    }
    catch (_a) {
        const resp = {
            statusCode: 500,
            message: 'Internal server error',
        };
        res.status(500).json(resp);
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = product_schema_1.createProductSchema.parse(req.body);
        product = (0, objectUtil_1.trimObject)(product);
        const productModel = new Product_1.default(product);
        const resp = yield productModel.save();
        const response = {
            statusCode: 201,
            data: resp
        };
        res.status(201).json(response);
    }
    catch (_a) {
        const resp = {
            statusCode: 500,
            message: 'Internal server error',
        };
        res.status(500).json(resp);
    }
});
exports.createProduct = createProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = product_schema_1.idProductParamsSchema.parse(req.params);
        const product = yield Product_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!product) {
            res.status(404).json({
                message: 'Product not found',
                statusCode: 404
            });
            return;
        }
        const response = {
            statusCode: 200,
            data: product
        };
        res.json(response);
    }
    catch (_a) {
        const resp = {
            statusCode: 500,
            message: 'Internal server error',
        };
        res.status(500).json(resp);
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = product_schema_1.idProductParamsSchema.parse(req.params);
        let product = product_schema_1.updateProductSchema.parse(req.body);
        product = (0, objectUtil_1.trimObject)(product);
        if (id !== product.id) {
            res.status(400).json({
                errors: [
                    {
                        message: 'The id in the params does not match the id in the body'
                    }
                ]
            });
            return;
        }
        const exists = yield Product_1.default.findOne({
            where: {
                id: id
            }
        });
        if (!exists) {
            res.status(404).json({
                message: 'El producto no existe',
                statusCode: 404
            });
            return;
        }
        yield exists.update(product);
        const response = {
            statusCode: 200,
            data: exists
        };
        res.json(response);
    }
    catch (_a) {
        const resp = {
            statusCode: 500,
            message: 'Internal server error',
        };
        res.status(500).json(resp);
    }
});
exports.updateProduct = updateProduct;
const patchProductAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = product_schema_1.idProductParamsSchema.parse(req.params);
        const { availability } = product_schema_1.availabilityProductSchema.parse(req.body);
        const exists = yield Product_1.default.findByPk(id);
        if (!exists) {
            res.status(404).json({
                message: 'El producto no existe',
                statusCode: 404
            });
            return;
        }
        yield exists.update({
            availability
        });
        const response = {
            statusCode: 200,
            data: exists
        };
        res.json(response);
    }
    catch (_a) {
        const resp = {
            statusCode: 500,
            message: 'Internal server error',
        };
        res.status(500).json(resp);
    }
});
exports.patchProductAvailability = patchProductAvailability;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = product_schema_1.idProductParamsSchema.parse(req.params);
        const exists = yield Product_1.default.findByPk(id);
        if (!exists) {
            res.status(404).json({
                message: 'El producto no existe',
            });
            return;
        }
        yield exists.destroy();
        const response = {
            statusCode: 200,
            data: exists
        };
        res.json(response);
    }
    catch (_a) {
        const resp = {
            statusCode: 500,
            message: 'Internal server error',
        };
        res.status(500).json(resp);
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.js.map