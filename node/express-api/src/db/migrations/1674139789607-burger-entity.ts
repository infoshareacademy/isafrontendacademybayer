import { MigrationInterface, QueryRunner } from "typeorm";

export class burgerEntity1674139789607 implements MigrationInterface {
    name = 'burgerEntity1674139789607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "burger" ("id" SERIAL NOT NULL, "ingredients" character varying NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_80c737e94dfc6a7cecd5a3a2a43" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "burger"`);
    }

}
