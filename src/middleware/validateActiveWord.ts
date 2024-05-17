import { Request, Response, NextFunction } from 'express';
import DataSource from '../orm/dbConnection';
import WordEntity from '../orm/entity/WordEntity';
import { selectNewWord } from '../services/word';

export default async function validateUser(req: Request, res: Response, next: NextFunction) {
    const wordRepository = DataSource.getRepository(WordEntity);

    const activeWord = await wordRepository.findOne({
        where: {
            used: true
        }
    });

    if(!activeWord){
        selectNewWord();
    }

    next();
}