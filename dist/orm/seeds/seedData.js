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
const typeorm_1 = require("typeorm");
const typeorm_extension_1 = require("typeorm-extension");
const dbConnection_1 = require("../dbConnection");
const dataSource = new typeorm_1.DataSource(Object.assign({}, dbConnection_1.connectionOptions));
dataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dataSource.synchronize(true);
    yield (0, typeorm_extension_1.runSeeders)(dataSource);
    process.exit();
}));
