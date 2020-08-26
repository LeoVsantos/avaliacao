import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateVehicleService from '../../services/CreateVehicleService';
import ShowVehicleService from '../../services/ShowVehiclesService';
import UpdateVehicleService from '../../services/UpdateVehicleService';
import DeleteVehicleService from '../../services/DeleteVehicleService';

interface data {
  id?: string;
  brand?: string;
  model?: string;
  year?: number;
  fuel?: 'gasoline' | 'alcohol' | 'flex';
  color?: string;
  price?: number;
  category?: string;
}

export default class VehicleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { brand, category, color, model, price, year, fuel } = request.body;

    const createVehicle = container.resolve(CreateVehicleService);

    const vehicle = await createVehicle.execute({
      brand,
      category,
      color,
      model,
      price,
      year,
      fuel,
    });

    return response.status(201).json(classToClass(vehicle));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      category,
      color,
      model,
      price,
      year,
      fuel,
    } = request.query as data;

    const { id } = request.params;

    const showVehicles = container.resolve(ShowVehicleService);

    const vehicles = await showVehicles.execute({
      id,
      brand,
      category,
      color,
      fuel,
      model,
      price,
      year,
    });

    return response.status(200).json(classToClass(vehicles));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { brand, category, color, fuel, model, price, year } = request.body;

    const updateVehicle = container.resolve(UpdateVehicleService);

    const vehicle = await updateVehicle.execute({
      id,
      brand,
      category,
      color,
      fuel,
      model,
      price,
      year,
    });

    return response.status(200).json(classToClass(vehicle));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteVehicle = container.resolve(DeleteVehicleService);

    await deleteVehicle.execute(id);

    return response.status(204).json();
  }
}
