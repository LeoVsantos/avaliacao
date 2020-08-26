"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class vehicles1598295814839 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'vehicles',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'brand',
        type: 'varchar'
      }, {
        name: 'model',
        type: 'varchar'
      }, {
        name: 'year',
        type: 'integer'
      }, {
        name: 'fuel',
        type: 'varchar'
      }, {
        name: 'color',
        type: 'varchar'
      }, {
        name: 'category_id',
        type: 'uuid'
      }, {
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('vehicles');
  }

}

exports.default = vehicles1598295814839;