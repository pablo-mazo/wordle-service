"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionOptions = void 0;
const typeorm_1 = require("typeorm");
const WordEntity_1 = __importDefault(require("./entity/WordEntity"));
const WordUserEntity_1 = __importDefault(require("./entity/WordUserEntity"));
const wordSeeder_1 = __importDefault(require("./seeds/wordSeeder"));
const wordUserSeeder_1 = __importDefault(require("./seeds/wordUserSeeder"));
exports.connectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'wordle',
    password: 'wordle_password',
    database: 'wordle',
    synchronize: false,
    logging: true,
    entities: [WordEntity_1.default, WordUserEntity_1.default],
    migrations: ["src/orm/migrations/*.ts"],
    seeds: [wordSeeder_1.default, wordUserSeeder_1.default]
};
const dataSource = new typeorm_1.DataSource(Object.assign({}, exports.connectionOptions));
dataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
exports.default = dataSource;
