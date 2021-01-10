import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1605140547328 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isPrimary: true
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'name',
                    type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
