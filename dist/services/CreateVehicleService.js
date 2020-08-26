"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Vehicle = _interopRequireDefault(require("../database/entities/Vehicle"));

var _Category = _interopRequireDefault(require("../database/entities/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateVehicleService {
  constructor() {
    this.VehicleRepository = void 0;
    this.CategoryRepository = void 0;
    this.VehicleRepository = (0, _typeorm.getRepository)(_Vehicle.default);
    this.CategoryRepository = (0, _typeorm.getRepository)(_Category.default);
  }

  async execute({
    brand,
    color,
    model,
    price,
    year,
    fuel,
    category
  }) {
    let vehicleCategory = await this.CategoryRepository.findOne({
      where: {
        title: category
      }
    });

    if (!vehicleCategory) {
      vehicleCategory = this.CategoryRepository.create({
        title: category
      });
      await this.CategoryRepository.save(vehicleCategory);
    }

    const vehicle = this.VehicleRepository.create({
      brand,
      color,
      fuel,
      model,
      price,
      year,
      category: vehicleCategory
    });
    await this.VehicleRepository.save(vehicle);
    return vehicle;
  }

}

var _default = CreateVehicleService;
exports.default = _default;