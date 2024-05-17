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
exports.selectNewWord = void 0;
const dbConnection_1 = __importDefault(require("../orm/dbConnection"));
const WordEntity_1 = __importDefault(require("../orm/entity/WordEntity"));
function selectNewWord() {
    return __awaiter(this, void 0, void 0, function* () {
        const wordsRepository = dbConnection_1.default.getRepository(WordEntity_1.default);
        // Search new word
        const newWord = yield wordsRepository.createQueryBuilder()
            .where('used = :used', { used: false })
            .orderBy('RANDOM()')
            .getOne();
        // Update previous word
        yield dbConnection_1.default.createQueryBuilder()
            .update(WordEntity_1.default)
            .set({ used: false })
            .where('used = :used', { used: true })
            .execute();
        // Become searched word to currently word
        yield dbConnection_1.default.createQueryBuilder()
            .update(WordEntity_1.default)
            .set({ used: true })
            .where('id = :id', { id: newWord === null || newWord === void 0 ? void 0 : newWord.id })
            .execute();
    });
}
exports.selectNewWord = selectNewWord;
