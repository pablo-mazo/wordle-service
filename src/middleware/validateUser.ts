import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export default function validateUser(req: Request, res: Response, next: NextFunction) {
    if (!req.session.userId){
        req.session.userId = uuidv4();
    }
    next();
}