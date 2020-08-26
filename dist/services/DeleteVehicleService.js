"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../infra/errors/AppError"));

var _Vehicle = _interopRequireDefault(require("../database/entities/Vehicle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteVehicleService {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Vehicle.default);
  }

  async execute(id) {
    const checkVehicleExists = await this.ormRepository.findOne(id);

    if (!checkVehicleExists) {
      throw new _AppError.default('Vehicle id not found.');
    }

    await this.ormRepository.delete({
      id
    });
  }

}

var _default = DeleteVehicleService;
exports.default = _default;