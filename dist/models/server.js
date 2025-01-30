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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const consoleUtil_1 = require("../utils/consoleUtil");
const products_1 = __importDefault(require("../routes/products"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("../config/swagger");
const cors_1 = __importDefault(require("cors"));
const env_1 = require("../config/env");
const morgan_1 = __importDefault(require("morgan"));
class Server {
    constructor(autoInit = true) {
        this.app = (0, express_1.default)();
        this.port = 3000;
        if (autoInit) {
            this.init();
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.configure();
            this.configureRoutes();
            yield this.connectDb();
        });
    }
    connectDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.authenticate();
                db_1.default.sync();
                // showInfo('[db] Connection has been established successfully.');
            }
            catch (error) {
                (0, consoleUtil_1.showError)('[db] Unable to connect to the database:', error);
                console.log('Unable to connect to the database:');
            }
        });
    }
    configure() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)({
            origin: function (origin, callback) {
                if (!origin)
                    return callback(null, true);
                if (env_1.ENV.FRONTED_URL == origin) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        }));
        this.app.use((0, morgan_1.default)("dev"));
    }
    configureRoutes() {
        this.app.use('/api/products', products_1.default);
        this.app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, swagger_1.swaggerUiOptions));
        this.app.get("/swagger.json", (req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.send(swagger_1.swaggerSpec);
        });
    }
    start(callback) {
        this.severInstance = this.app.listen(this.port, callback);
    }
    stop(callback) {
        this.severInstance.close(callback);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map