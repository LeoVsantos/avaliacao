"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _celebrate = require("celebrate");

require("express-async-errors");

require("reflect-metadata");

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./infra/routes"));

var _AppError = _interopRequireDefault(require("./infra/errors/AppError"));

require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, request, response, _) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
app.listen(3333, () => {
  console.log('Server started');
});