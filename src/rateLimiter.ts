import limiter from 'express-rate-limit';

export default limiter({
    windowMs: 60000,
    max: 15,
    standardHeaders: true,
    message: 'Too many request, please try again later'
});