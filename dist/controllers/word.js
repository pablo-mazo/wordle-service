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
exports.best = exports.compare = void 0;
const dbConnection_1 = __importDefault(require("../orm/dbConnection"));
const WordEntity_1 = __importDefault(require("../orm/entity/WordEntity"));
const WordUserEntity_1 = __importDefault(require("../orm/entity/WordUserEntity"));
function compare(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userWord = req.body.user_word;
            if (userWord.length != 5) {
                throw new Error('La palabra debe ser de 5 caracteres');
            }
            const wordRepository = dbConnection_1.default.getRepository(WordEntity_1.default);
            const activeWord = yield wordRepository.findOne({
                where: {
                    used: true
                }
            });
            if (!activeWord) {
                throw new Error('No hay palabra activa');
            }
            const result = compareWords(userWord, activeWord === null || activeWord === void 0 ? void 0 : activeWord.name);
            const victory = userWord === activeWord.name;
            updateWordUser(activeWord, req.session.userId, victory);
            res.json(result);
        }
        catch (error) {
            console.log("Error inesperado: ", error);
        }
    });
}
exports.compare = compare;
function best(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wordRepository = dbConnection_1.default.getRepository(WordEntity_1.default);
            const words = yield wordRepository
                .query(`
            SELECT words.name, COUNT(victory) as count_victories
            FROM words_users
            INNER JOIN words on words_users."wordId" = words.id
            WHERE words_users.victory = ${true}
            GROUP BY words.name
            ORDER BY count_victories DESC;
        `);
            res.json(words);
        }
        catch (error) {
            console.log("Error inesperado: ", error);
        }
    });
}
exports.best = best;
function updateWordUser(word, userId, victory) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wordUserRepository = dbConnection_1.default.getRepository(WordUserEntity_1.default);
            const wordUser = yield wordUserRepository.findOne({
                where: {
                    userId: userId
                }
            });
            // Create words_users if not exist
            if (!wordUser) {
                wordUserRepository.save({ wordId: word.id, userId, tries: 4, victory });
            }
            else {
                if (wordUser.victory || wordUser.tries === 0)
                    return;
                if (word.name)
                    yield dbConnection_1.default.createQueryBuilder()
                        .update(WordUserEntity_1.default)
                        .set({ tries: wordUser.tries - 1, victory })
                        .where('id = :id', { id: wordUser === null || wordUser === void 0 ? void 0 : wordUser.id })
                        .execute();
            }
        }
        catch (error) {
            console.log("Error inesperado: ", error);
        }
    });
}
function compareWords(userWord, activeWord) {
    const result = [];
    // Compare each letter of the user's word with the active word
    for (let i = 0; i < 5; i++) {
        const userLetter = userWord[i];
        const activeLetter = activeWord[i];
        if (userLetter === activeLetter) {
            // Letter is in the same position
            result.push({ letter: userLetter, value: 1 });
        }
        else if (activeWord.includes(userLetter)) {
            // Letter is in the active word but not in the same position
            result.push({ letter: userLetter, value: 2 });
        }
        else {
            // Letter is not in the active word
            result.push({ letter: userLetter, value: 3 });
        }
    }
    return result;
}
