import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1712748209408 implements MigrationInterface {
  name = ' $npmConfigName1712748209408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."todos_state_enum" AS ENUM('очікує виконання', 'в процесі', 'виконаний')`,
    );
    await queryRunner.query(
      `CREATE TABLE "todos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "state" "public"."todos_state_enum" NOT NULL, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todos"`);
    await queryRunner.query(`DROP TYPE "public"."todos_state_enum"`);
  }
}
