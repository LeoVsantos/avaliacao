"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("./users.routes"));

var _sessions = _interopRequireDefault(require("./sessions.routes"));

var _vehicles = _interopRequireDefault(require("./vehicles.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/sessions', _sessions.default);
routes.use('/users', _users.default);
routes.use('/vehicles', _vehicles.default);
var _default = routes;
exports.default = _default;