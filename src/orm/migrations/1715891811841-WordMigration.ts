import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class WordMigration1715891811841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'words',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true },
                    { name: 'name', type: 'varchar' },
                    { name: 'used', type: 'boolean' }
                ]
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'words_users',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true },
                    { name: 'wordId', type: 'int' },
                    { name: 'userId', type: 'uuid' },
                    { name: 'tries', type: 'int' },
                    { name: 'victory', type: 'boolean' }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'words_users',
            new TableForeignKey({
                columnNames: ["wordId"],
                referencedColumnNames: ["id"],
                referencedTableName: "words",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> { }

}
