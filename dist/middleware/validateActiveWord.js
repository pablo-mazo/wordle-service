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
const dbConnection_1 = __importDefault(require("../orm/dbConnection"));
const WordEntity_1 = __importDefault(require("../orm/entity/WordEntity"));
const word_1 = require("../services/word");
function validateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const wordRepository = dbConnection_1.default.getRepository(WordEntity_1.default);
        const activeWord = yield wordRepository.findOne({
            where: {
                used: true
            }
        });
        if (!activeWord) {
            (0, word_1.selectNewWord)();
        }
        next();
    });
}
exports.default = validateUser;
