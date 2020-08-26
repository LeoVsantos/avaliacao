"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Vehicle = _interopRequireDefault(require("../database/entities/Vehicle"));

var _Category = _interopRequireDefault(require("../database/entities/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowVehiclesService {
  constructor() {
    this.VehicleRepository = void 0;
    this.VehicleCategoryRepository = void 0;
    this.VehicleRepository = (0, _typeorm.getRepository)(_Vehicle.default);
    this.VehicleCategoryRepository = (0, _typeorm.getRepository)(_Category.default);
  }

  async execute({
    id,
    brand,
    category,
    color,
    fuel,
    model
  }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let filter;

    if (brand) {
      filter = { ...filter,
        brand: (0, _typeorm.Like)(`%${brand}%`)
      };
    }

    if (color) {
      filter = { ...filter,
        color: (0, _typeorm.Like)(`%${color}%`)
      };
    }

    if (fuel) {
      filter = { ...filter,
        fuel: (0, _typeorm.Like)(`%${fuel}%`)
      };
    }

    if (model) {
      filter = { ...filter,
        model: (0, _typeorm.Like)(`%${model}%`)
      };
    }

    if (category) {
      const vehiclesCategory = await this.VehicleCategoryRepository.findOne({
        where: {
          title: (0, _typeorm.Like)(`%${category}%`)
        }
      });
      filter = { ...filter,
        category_id: vehiclesCategory?.id
      };
    }

    let vehicles = await this.VehicleRepository.find();

    if (filter) {
      vehicles = await this.VehicleRepository.find({
        where: filter
      });
    }

    if (id) {
      vehicles = await this.VehicleRepository.find({
        where: {
          id
        }
      });
    }

    return vehicles;
  }

}

var _default = ShowVehiclesService;
exports.default = _default;