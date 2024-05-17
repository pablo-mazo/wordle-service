import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import WordEntity from './entity/WordEntity';
import WordUserEntity from './entity/WordUserEntity';
import WordSeeder from './seeds/wordSeeder';
import WordUserSeeder from './seeds/wordUserSeeder';

export const connectionOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'wordle',
  password: 'wordle_password',
  database: 'wordle',
  synchronize: false,
  logging: true,
  entities: [WordEntity, WordUserEntity],
  migrations: ["src/orm/migrations/*.ts"],
  seeds: [WordSeeder, WordUserSeeder]
};

const dataSource = new DataSource({
  ...connectionOptions
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  });

export default dataSource;