"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function validateUser(req, res, next) {
    if (!req.session.userId) {
        req.session.userId = (0, uuid_1.v4)();
    }
    next();
}
exports.default = validateUser;
