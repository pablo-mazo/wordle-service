"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const uuid_1 = require("uuid");
const rateLimiter_1 = __importDefault(require("./rateLimiter"));
const dbConnection_1 = __importDefault(require("./orm/dbConnection"));
const validateUser_1 = __importDefault(require("./middleware/validateUser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const wordRoutes_1 = __importDefault(require("./routes/wordRoutes"));
const word_1 = require("./services/word");
dbConnection_1.default;
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware / Security
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(rateLimiter_1.default);
app.use(body_parser_1.default.json());
app.disable('x-powered-by');
//Making session as middleware for all routes.
app.use((0, express_session_1.default)({
    name: 'wordle-session-cookie',
    genid: function (req) {
        console.log('session id created');
        return (0, uuid_1.v4)();
    },
    secret: 'wordle-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 }
}));
app.use(validateUser_1.default);
app.get('/', (req, res) => {
    res.send('Hello, worl!');
});
app.use('/user', userRoutes_1.default);
app.use('/word', wordRoutes_1.default);
// Schedule to select a new word every 5 minutes
node_schedule_1.default.scheduleJob('*/5 * * * *', word_1.selectNewWord);
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
