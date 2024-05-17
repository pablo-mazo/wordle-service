import 'dotenv/config'

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import schedule from 'node-schedule';
import { v4 as uuidv4 } from 'uuid';
import limiter from './rateLimiter';
import CreateDBConnection from './orm/dbConnection';
import validateUser from './middleware/validateUser';

import userRoutes from './routes/userRoutes';
import wordRouter from './routes/wordRoutes';
import { selectNewWord } from './services/word';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

CreateDBConnection;
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware / Security
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.disable('x-powered-by');

//Making session as middleware for all routes.
app.use(session(
  {
    name: 'wordle-session-cookie',
    genid: function (req) {
      console.log('session id created');
      return uuidv4();
    },
    secret: 'wordle-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 }
}));

app.use(validateUser);

app.get('/', (req, res) => {
  res.send('Hello, worl!');
});

app.use('/user', userRoutes);
app.use('/word', wordRouter);

// Schedule to select a new word every 5 minutes
schedule.scheduleJob('*/5 * * * *', selectNewWord);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});