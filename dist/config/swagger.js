"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.swaggerUiOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Products',
                description: 'API for products in the system'
            }
        ],
        info: {
            title: 'API Documentation',
            description: "API endpoints for a product management system",
            contact: {
                name: "Desmond Obisi",
                email: "info@miniblog.com",
                url: "https://github.com/DesmondSanctity/node-js-swagger"
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:3000/",
                description: "Local server"
            },
            {
                url: "<your live url here>",
                description: "Live server"
            },
        ],
    },
    // looks for configuration in specified directories
    apis: ['./src/routes/*.ts'],
};
exports.swaggerUiOptions = {
    customCss: `
    .swagger-ui .topbar .topbar-wrapper .link {
      content: url("https://i.etsystatic.com/27469994/r/il/ab0d89/3257847579/il_1140xN.3257847579_6l0s.jpg");
      background-size: contain;
      width: 100px;
      height: 100px;
    }
  `,
    customSiteTitle: "My API Docs"
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map