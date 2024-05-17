import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { connectionOptions } from '../dbConnection';
const dataSource = new DataSource({
    ...connectionOptions,
});

dataSource.initialize().then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
});