import { getRepository, Repository } from 'typeorm';
import AppError from '../infra/errors/AppError';

import Vehicle from '../database/entities/Vehicle';

class DeleteVehicleService {
  private ormRepository: Repository<Vehicle>;

  constructor() {
    this.ormRepository = getRepository(Vehicle);
  }

  public async execute(id: string): Promise<void> {
    const checkVehicleExists = await this.ormRepository.findOne(id);

    if (!checkVehicleExists) {
      throw new AppError('Vehicle id not found.');
    }

    await this.ormRepository.delete({ id });
  }
}

export default DeleteVehicleService;
