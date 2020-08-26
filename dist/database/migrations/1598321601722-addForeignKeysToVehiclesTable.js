"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class addForeignKeysToVehiclesTable1598321601722 {
  async up(queryRunner) {
    await queryRunner.createForeignKey('vehicles', new _typeorm.TableForeignKey({
      columnNames: ['category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      name: 'VehiclesCategory',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('vehicles', 'VehiclesCategory');
  }

}

exports.default = addForeignKeysToVehiclesTable1598321601722;