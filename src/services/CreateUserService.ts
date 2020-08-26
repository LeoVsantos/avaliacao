import { getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../infra/errors/AppError';

import User from '../database/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.ormRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.ormRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.ormRepository.save(user);

    return user;
  }
}

export default CreateUserService;
