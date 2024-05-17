"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const word_1 = require("../controllers/word");
const validateActiveWord_1 = __importDefault(require("../middleware/validateActiveWord"));
const router = (0, express_1.Router)();
router.use(validateActiveWord_1.default);
router.get('/best', word_1.best);
router.post('/compare', word_1.compare);
exports.default = router;
