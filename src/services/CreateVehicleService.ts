import { getRepository, Repository } from 'typeorm';

import Vehicle from '../database/entities/Vehicle';
import Category from '../database/entities/Category';

interface Request {
  brand: string;
  model: string;
  year: number;
  fuel: 'gasoline' | 'alcohol' | 'flex';
  color: string;
  price: number;
  category: string;
}

class CreateVehicleService {
  private VehicleRepository: Repository<Vehicle>;

  private CategoryRepository: Repository<Category>;

  constructor() {
    this.VehicleRepository = getRepository(Vehicle);
    this.CategoryRepository = getRepository(Category);
  }

  public async execute({
    brand,
    color,
    model,
    price,
    year,
    fuel,
    category,
  }: Request): Promise<Vehicle> {
    let vehicleCategory = await this.CategoryRepository.findOne({
      where: { title: category },
    });

    if (!vehicleCategory) {
      vehicleCategory = this.CategoryRepository.create({
        title: category,
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
      category: vehicleCategory,
    });

    await this.VehicleRepository.save(vehicle);

    return vehicle;
  }
}

export default CreateVehicleService;
