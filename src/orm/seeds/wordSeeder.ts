import fs from 'node:fs';
import { Seeder } from "typeorm-extension";
import DataSource from '../dbConnection';
import WordEntity from '../entity/WordEntity';

export default class WordSeeder implements Seeder {
    public async run(): Promise<void> {
        const wordsRepository = DataSource.getRepository(WordEntity);

        const jsonData = fs.readFileSync('src/data.json', 'utf8');

        // Parse JSON data
        const dataArray: string[] = JSON.parse(jsonData);
        const dataToInsert = [];

        for (let i = 0; i < dataArray.length; i++) {
            dataToInsert.push({ name: dataArray[i], used: false });
        }

        const users = await wordsRepository.save(dataToInsert);
    }
}