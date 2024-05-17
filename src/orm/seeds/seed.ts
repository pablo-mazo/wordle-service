import { DataSource } from 'typeorm';
import { runSeeder } from 'typeorm-extension';
import { connectionOptions } from '../dbConnection';
import WordSeeder from '../seeds/wordSeeder';

const dataSource = new DataSource({
    ...connectionOptions,
});

dataSource.initialize().then(async () => {
    await dataSource.synchronize(true);
    await runSeeder(dataSource, WordSeeder);
    process.exit();
});