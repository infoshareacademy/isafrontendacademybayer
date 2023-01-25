import { MigrationInterface, QueryRunner } from "typeorm";

export class burgerUserRelation1674485857500 implements MigrationInterface {
    name = 'burgerUserRelation1674485857500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "burger" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "burger" ADD CONSTRAINT "FK_d25e75d1b170160c259a2026b0f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "burger" DROP CONSTRAINT "FK_d25e75d1b170160c259a2026b0f"`);
        await queryRunner.query(`ALTER TABLE "burger" DROP COLUMN "userId"`);
    }

}
