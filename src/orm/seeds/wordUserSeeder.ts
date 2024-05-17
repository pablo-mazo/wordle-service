import { v4 as uuidv4 } from 'uuid';
import { Seeder } from "typeorm-extension";
import DataSource from '../dbConnection';
import WordUserEntity from '../entity/WordUserEntity';

export default class WordUserSeeder implements Seeder {
    public async run(): Promise<void> {
        for (let i = 1; i < 10; i++) {
            await this.generateUser(i);
        }
    }

    private async generateUser(qty: number) {
        const wordsUsersRepository = DataSource.getRepository(WordUserEntity);
        const data = [];
        const userId = uuidv4();

        for (let i = 0; i < qty; i++) {
            const wordId = this.generateRandomWordIdNumber();
            const tries = this.generateRandomTriesNumber();
            const victory = this.generateRandomBoolean();
            data.push({ wordId, userId, tries, victory });
        }

        await wordsUsersRepository.save(data);
    }

    private generateRandomWordIdNumber(){
        return Math.floor(Math.random() * 19) + 1;
    }

    private generateRandomTriesNumber() {
        return Math.floor(Math.random() * 4) + 1;
    }

    private generateRandomBoolean() {
        const randomNum = Math.random();
        return randomNum >= 0.5;
    }
}