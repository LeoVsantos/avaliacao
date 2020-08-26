import { getRepository, Repository, Like } from 'typeorm';

import Vehicle from '../database/entities/Vehicle';
import Category from '../database/entities/Category';

interface Request {
  id?: string;
  brand?: string;
  model?: string;
  year?: number;
  fuel?: 'gasoline' | 'alcohol' | 'flex';
  color?: string;
  price?: number;
  category?: string;
}

class ShowVehiclesService {
  private VehicleRepository: Repository<Vehicle>;

  private VehicleCategoryRepository: Repository<Category>;

  constructor() {
    this.VehicleRepository = getRepository(Vehicle);
    this.VehicleCategoryRepository = getRepository(Category);
  }

  public async execute({
    id,
    brand,
    category,
    color,
    fuel,
    model,
  }: Request): Promise<Vehicle[] | Vehicle> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let filter: any;

    if (brand) {
      filter = {
        ...filter,
        brand: Like(`%${brand}%`),
      };
    }

    if (color) {
      filter = {
        ...filter,
        color: Like(`%${color}%`),
      };
    }

    if (fuel) {
      filter = {
        ...filter,
        fuel: Like(`%${fuel}%`),
      };
    }

    if (model) {
      filter = {
        ...filter,
        model: Like(`%${model}%`),
      };
    }

    if (category) {
      const vehiclesCategory = await this.VehicleCategoryRepository.findOne({
        where: {
          title: Like(`%${category}%`),
        },
      });

      filter = {
        ...filter,
        category_id: vehiclesCategory?.id,
      };
    }

    let vehicles = await this.VehicleRepository.find();

    if (filter) {
      vehicles = await this.VehicleRepository.find({
        where: filter,
      });
    }

    if (id) {
      vehicles = await this.VehicleRepository.find({ where: { id } });
    }

    return vehicles;
  }
}

export default ShowVehiclesService;
