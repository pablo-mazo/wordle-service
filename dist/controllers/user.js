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
exports.bestPlayers = exports.statsByUserId = exports.stats = void 0;
const uuid_1 = require("uuid");
const dbConnection_1 = __importDefault(require("../orm/dbConnection"));
const WordUserEntity_1 = __importDefault(require("../orm/entity/WordUserEntity"));
function stats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wordUserRepository = dbConnection_1.default.getRepository(WordUserEntity_1.default);
            const userStats = yield wordUserRepository.find({
                where: {
                    userId: req.session.userId
                }
            });
            const victories = userStats.filter(userStat => userStat.victory === true);
            let result = {
                plays: userStats.length,
                victories: victories.length
            };
            res.json(result);
        }
        catch (error) {
            console.log("Error inesperado: ", error);
        }
    });
}
exports.stats = stats;
function statsByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            if (!(0, uuid_1.validate)(userId)) {
                throw new Error('User id invalido');
            }
            const wordUserRepository = dbConnection_1.default.getRepository(WordUserEntity_1.default);
            const userStats = yield wordUserRepository.find({
                where: {
                    userId: userId
                }
            });
            const victories = userStats.filter(userStat => userStat.victory === true);
            let result = {
                plays: userStats.length,
                victories: victories.length
            };
            res.json(result);
        }
        catch (error) {
            console.log("Error inesperado: ", error.message);
        }
    });
}
exports.statsByUserId = statsByUserId;
function bestPlayers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wordUserRepository = dbConnection_1.default.getRepository(WordUserEntity_1.default);
            const bestPlayers = yield wordUserRepository.query(`
            SELECT words_users."userId", COUNT(victory) as count_victories
            FROM words_users
            WHERE words_users.victory = ${true}
            GROUP BY words_users."userId"
            ORDER BY count_victories DESC
            LIMIT 10;
        `);
            res.json(bestPlayers);
        }
        catch (error) {
            console.log("Error inesperado: ", error);
        }
    });
}
exports.bestPlayers = bestPlayers;
