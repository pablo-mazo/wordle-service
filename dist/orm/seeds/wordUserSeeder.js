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
const uuid_1 = require("uuid");
const dbConnection_1 = __importDefault(require("../dbConnection"));
const WordUserEntity_1 = __importDefault(require("../entity/WordUserEntity"));
class WordUserSeeder {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 1; i < 10; i++) {
                yield this.generateUser(i);
            }
        });
    }
    generateUser(qty) {
        return __awaiter(this, void 0, void 0, function* () {
            const wordsUsersRepository = dbConnection_1.default.getRepository(WordUserEntity_1.default);
            const data = [];
            const userId = (0, uuid_1.v4)();
            for (let i = 0; i < qty; i++) {
                const wordId = this.generateRandomWordIdNumber();
                const tries = this.generateRandomTriesNumber();
                const victory = this.generateRandomBoolean();
                data.push({ wordId, userId, tries, victory });
            }
            yield wordsUsersRepository.save(data);
        });
    }
    generateRandomWordIdNumber() {
        return Math.floor(Math.random() * 19) + 1;
    }
    generateRandomTriesNumber() {
        return Math.floor(Math.random() * 4) + 1;
    }
    generateRandomBoolean() {
        const randomNum = Math.random();
        return randomNum >= 0.5;
    }
}
exports.default = WordUserSeeder;
