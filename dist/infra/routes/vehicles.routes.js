"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _VehicleController = _interopRequireDefault(require("../controllers/VehicleController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const vehiclesRouter = (0, _express.Router)();
const vehicleController = new _VehicleController.default();
vehiclesRouter.post('/', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    brand: _celebrate.Joi.string().required().lowercase(),
    model: _celebrate.Joi.string().required().lowercase(),
    year: _celebrate.Joi.number().required(),
    fuel: _celebrate.Joi.string().lowercase().valid('gasoline', 'alcohol', 'flex'),
    color: _celebrate.Joi.string().required().lowercase(),
    price: _celebrate.Joi.number().required(),
    category: _celebrate.Joi.string().required().lowercase()
  }
}), vehicleController.create);
vehiclesRouter.get('/:id?', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid()
  },
  [_celebrate.Segments.QUERY]: {
    brand: _celebrate.Joi.string().lowercase(),
    model: _celebrate.Joi.string().lowercase(),
    year: _celebrate.Joi.number(),
    fuel: _celebrate.Joi.string().lowercase(),
    color: _celebrate.Joi.string().lowercase(),
    price: _celebrate.Joi.number(),
    category: _celebrate.Joi.string().lowercase()
  }
}), vehicleController.show);
vehiclesRouter.put('/:id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    brand: _celebrate.Joi.string().lowercase().required(),
    model: _celebrate.Joi.string().lowercase().required(),
    year: _celebrate.Joi.number().required(),
    fuel: _celebrate.Joi.string().lowercase().required().valid('gasoline', 'alcohol', 'flex'),
    color: _celebrate.Joi.string().lowercase().required(),
    price: _celebrate.Joi.number().required(),
    category: _celebrate.Joi.string().lowercase()
  }
}), vehicleController.update);
vehiclesRouter.delete('/:id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), vehicleController.delete);
var _default = vehiclesRouter;
exports.default = _default;