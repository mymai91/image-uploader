import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlertImageTableRemoveUserIdColumn1736905982113
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'image',
      new TableColumn({
        name: 'deletedAt',
        type: 'timestamp',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'image',
      new TableColumn({
        name: 'isActive',
        type: 'boolean',
        default: true,
      }),
    );

    await queryRunner.addColumn(
      'image',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()',
      }),
    );

    await queryRunner.renameColumn('image', 'uploadDate', 'createdAt');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('image', 'isActive');
    await queryRunner.dropColumn('image', 'deletedAt');
    await queryRunner.dropColumn('image', 'updatedAt');
    await queryRunner.renameColumn('image', 'createdAt', 'uploadDate');
  }
}
