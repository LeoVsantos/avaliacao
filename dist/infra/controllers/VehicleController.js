"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateVehicleService = _interopRequireDefault(require("../../services/CreateVehicleService"));

var _ShowVehiclesService = _interopRequireDefault(require("../../services/ShowVehiclesService"));

var _UpdateVehicleService = _interopRequireDefault(require("../../services/UpdateVehicleService"));

var _DeleteVehicleService = _interopRequireDefault(require("../../services/DeleteVehicleService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VehicleController {
  async create(request, response) {
    const {
      brand,
      category,
      color,
      model,
      price,
      year,
      fuel
    } = request.body;

    const createVehicle = _tsyringe.container.resolve(_CreateVehicleService.default);

    const vehicle = await createVehicle.execute({
      brand,
      category,
      color,
      model,
      price,
      year,
      fuel
    });
    return response.status(201).json((0, _classTransformer.classToClass)(vehicle));
  }

  async show(request, response) {
    const {
      brand,
      category,
      color,
      model,
      price,
      year,
      fuel
    } = request.query;
    const {
      id
    } = request.params;

    const showVehicles = _tsyringe.container.resolve(_ShowVehiclesService.default);

    const vehicles = await showVehicles.execute({
      id,
      brand,
      category,
      color,
      fuel,
      model,
      price,
      year
    });
    return response.status(200).json((0, _classTransformer.classToClass)(vehicles));
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      brand,
      category,
      color,
      fuel,
      model,
      price,
      year
    } = request.body;

    const updateVehicle = _tsyringe.container.resolve(_UpdateVehicleService.default);

    const vehicle = await updateVehicle.execute({
      id,
      brand,
      category,
      color,
      fuel,
      model,
      price,
      year
    });
    return response.status(200).json((0, _classTransformer.classToClass)(vehicle));
  }

  async delete(request, response) {
    const {
      id
    } = request.params;

    const deleteVehicle = _tsyringe.container.resolve(_DeleteVehicleService.default);

    await deleteVehicle.execute(id);
    return response.status(204).json();
  }

}

exports.default = VehicleController;