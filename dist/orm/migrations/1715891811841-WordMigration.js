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
exports.WordMigration1715891811841 = void 0;
const typeorm_1 = require("typeorm");
class WordMigration1715891811841 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'words',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true },
                    { name: 'name', type: 'varchar' },
                    { name: 'used', type: 'boolean' }
                ]
            }));
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'words_users',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true },
                    { name: 'wordId', type: 'int' },
                    { name: 'userId', type: 'uuid' },
                    { name: 'tries', type: 'int' },
                    { name: 'victory', type: 'boolean' }
                ]
            }));
            yield queryRunner.createForeignKey('words_users', new typeorm_1.TableForeignKey({
                columnNames: ["wordId"],
                referencedColumnNames: ["id"],
                referencedTableName: "words",
                onDelete: "CASCADE",
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.WordMigration1715891811841 = WordMigration1715891811841;
