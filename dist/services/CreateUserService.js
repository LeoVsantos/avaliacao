"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _bcryptjs = require("bcryptjs");

var _AppError = _interopRequireDefault(require("../infra/errors/AppError"));

var _User = _interopRequireDefault(require("../database/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateUserService {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async execute({
    name,
    email,
    password
  }) {
    const checkUserExists = await this.ormRepository.findOne({
      where: {
        email
      }
    });

    if (checkUserExists) {
      throw new _AppError.default('Email address already used.');
    }

    const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
    const user = this.ormRepository.create({
      name,
      email,
      password: hashedPassword
    });
    await this.ormRepository.save(user);
    return user;
  }

}

var _default = CreateUserService;
exports.default = _default;