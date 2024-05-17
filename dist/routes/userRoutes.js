"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/stats', user_1.stats);
router.get('/stats/:id', user_1.statsByUserId);
router.get('/best-players', user_1.bestPlayers);
exports.default = router;
