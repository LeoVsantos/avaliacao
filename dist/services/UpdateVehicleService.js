"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../infra/errors/AppError"));

var _Vehicle = _interopRequireDefault(require("../database/entities/Vehicle"));

var _Category = _interopRequireDefault(require("../database/entities/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateVehicleService {
  constructor() {
    this.vehicleRepository = void 0;
    this.categoryRepository = void 0;
    this.vehicleRepository = (0, _typeorm.getRepository)(_Vehicle.default);
    this.categoryRepository = (0, _typeorm.getRepository)(_Category.default);
  }

  async execute({
    id,
    brand,
    category,
    color,
    model,
    price,
    year,
    fuel
  }) {
    const vehicle = await this.vehicleRepository.findOne(id);

    if (!vehicle) {
      throw new _AppError.default('Vehicle id not found.');
    }

    let vehicleCategory = await this.categoryRepository.findOne({
      where: {
        title: category
      }
    });

    if (!vehicleCategory) {
      vehicleCategory = this.categoryRepository.create({
        title: category
      });
      await this.categoryRepository.save(vehicleCategory);
    }

    vehicle.brand = brand;
    vehicle.category = vehicleCategory;
    vehicle.color = color;
    vehicle.model = model;
    vehicle.price = price;
    vehicle.year = year;
    vehicle.fuel = fuel;
    const updatedVehicle = await this.vehicleRepository.save(vehicle);
    return updatedVehicle;
  }

}

var _default = UpdateVehicleService;
exports.default = _default;