import { Request, Response } from 'express';
import DataSource from '../orm/dbConnection';
import WordEntity from '../orm/entity/WordEntity';
import WordUserEntity from '../orm/entity/WordUserEntity';

export async function compare(req: Request, res: Response){
    try {
        const userWord: string = req.body.user_word;

        if (userWord.length != 5) {
            throw new Error('La palabra debe ser de 5 caracteres');
        }

        const wordRepository = DataSource.getRepository(WordEntity);

        const activeWord = await wordRepository.findOne({
            where: {
                used: true
            }
        });

        if (!activeWord) {
            throw new Error('No hay palabra activa');
        }

        const result = compareWords(userWord, activeWord?.name);
        const victory: boolean = userWord === activeWord.name;

        updateWordUser(activeWord, req.session.userId, victory);

        res.json(result);
    } catch (error) {
        console.log("Error inesperado: ", error);
    }
}

export async function best(req: Request, res: Response) {
    try {
        const wordRepository = DataSource.getRepository(WordEntity);

        const words = await wordRepository
            .query(`
            SELECT words.name, COUNT(victory) as count_victories
            FROM words_users
            INNER JOIN words on words_users."wordId" = words.id
            WHERE words_users.victory = ${true}
            GROUP BY words.name
            ORDER BY count_victories DESC;
        `);

        res.json(words);
    } catch (error) {
        console.log("Error inesperado: ", error);
    }
}

async function updateWordUser(word: WordEntity, userId: string | undefined, victory: boolean) {
    try {
        const wordUserRepository = DataSource.getRepository(WordUserEntity);
        const wordUser = await wordUserRepository.findOne({
            where: {
                userId: userId
            }
        });

        // Create words_users if not exist
        if (!wordUser) {
            wordUserRepository.save({ wordId: word.id, userId, tries: 4, victory });
        } else {
            if (wordUser.victory || wordUser.tries === 0) return;

            if (word.name)
                await DataSource.createQueryBuilder()
                    .update(WordUserEntity)
                    .set({ tries: wordUser.tries - 1, victory })
                    .where('id = :id', { id: wordUser?.id })
                    .execute();
        }
    } catch (error) {
        console.log("Error inesperado: ", error);
    }
}

interface ComparisonResult {
    letter: string;
    value: 1 | 2 | 3;
}

function compareWords(userWord: string, activeWord: string): ComparisonResult[] {
    const result: ComparisonResult[] = [];

    // Compare each letter of the user's word with the active word
    for (let i = 0; i < 5; i++) {
        const userLetter = userWord[i];
        const activeLetter = activeWord[i];

        if (userLetter === activeLetter) {
            // Letter is in the same position
            result.push({ letter: userLetter, value: 1 });
        } else if (activeWord.includes(userLetter)) {
            // Letter is in the active word but not in the same position
            result.push({ letter: userLetter, value: 2 });
        } else {
            // Letter is not in the active word
            result.push({ letter: userLetter, value: 3 });
        }
    }

    return result;
}