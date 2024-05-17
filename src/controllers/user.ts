import { Request, Response } from 'express';
import { validate } from 'uuid';
import DataSource from '../orm/dbConnection';
import WordUserEntity from '../orm/entity/WordUserEntity';

interface StatsResult {
    plays: number;
    victories: number;
}

export async function stats(req: Request, res: Response) {
    try {
        const wordUserRepository = DataSource.getRepository(WordUserEntity);

        const userStats = await wordUserRepository.find({
            where: {
                userId: req.session.userId
            }
        });

        const victories = userStats.filter(userStat => userStat.victory === true);

        let result: StatsResult = {
            plays: userStats.length,
            victories: victories.length
        };

        res.json(result);
    } catch (error) {
        console.log("Error inesperado: ", error);
    }
}

export async function statsByUserId(req: Request, res: Response) {
    try {
        const userId = req.params.id;

        if (!validate(userId)){
            throw new Error('User id invalido')
        }

        const wordUserRepository = DataSource.getRepository(WordUserEntity);

        const userStats = await wordUserRepository.find({
            where: {
                userId: userId
            }
        });

        const victories = userStats.filter(userStat => userStat.victory === true);

        let result: StatsResult = {
            plays: userStats.length,
            victories: victories.length
        };

        res.json(result);
    } catch (error) {
        console.log("Error inesperado: ", (error as Error).message);
    }

}

export async function bestPlayers(req: Request, res: Response) {
    try {
        const wordUserRepository = DataSource.getRepository(WordUserEntity);

        const bestPlayers = await wordUserRepository.query(`
            SELECT words_users."userId", COUNT(victory) as count_victories
            FROM words_users
            WHERE words_users.victory = ${true}
            GROUP BY words_users."userId"
            ORDER BY count_victories DESC
            LIMIT 10;
        `);

        res.json(bestPlayers);
    } catch (error) {
        console.log("Error inesperado: ", error);
    }
}