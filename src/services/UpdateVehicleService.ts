import { getRepository, Repository } from 'typeorm';
import AppError from '../infra/errors/AppError';

import Vehicle from '../database/entities/Vehicle';
import Category from '../database/entities/Category';

interface Request {
  id: string;
  brand: string;
  model: string;
  year: number;
  fuel: string;
  color: string;
  price: number;
  category: string;
}

class UpdateVehicleService {
  private vehicleRepository: Repository<Vehicle>;

  private categoryRepository: Repository<Category>;

  constructor() {
    this.vehicleRepository = getRepository(Vehicle);
    this.categoryRepository = getRepository(Category);
  }

  public async execute({
    id,
    brand,
    category,
    color,
    model,
    price,
    year,
    fuel,
  }: Request): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne(id);

    if (!vehicle) {
      throw new AppError('Vehicle id not found.');
    }

    let vehicleCategory = await this.categoryRepository.findOne({
      where: { title: category },
    });

    if (!vehicleCategory) {
      vehicleCategory = this.categoryRepository.create({
        title: category,
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

export default UpdateVehicleService;
