import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import VehicleController from '../controllers/VehicleController';
import EnsureAuthenticated from '../middlewares/ensureAuthenticated';

const vehiclesRouter = Router();
const vehicleController = new VehicleController();

vehiclesRouter.post(
  '/',
  EnsureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      brand: Joi.string().required().lowercase(),
      model: Joi.string().required().lowercase(),
      year: Joi.number().required(),
      fuel: Joi.string().lowercase(),
      color: Joi.string().required().lowercase(),
      price: Joi.number().required(),
      category: Joi.string().required().lowercase(),
    },
  }),
  vehicleController.create,
);

vehiclesRouter.get(
  '/:id?',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
    [Segments.QUERY]: {
      brand: Joi.string().lowercase(),
      model: Joi.string().lowercase(),
      year: Joi.number(),
      fuel: Joi.string().lowercase(),
      color: Joi.string().lowercase(),
      price: Joi.number(),
      category: Joi.string().lowercase(),
    },
  }),
  vehicleController.show,
);

vehiclesRouter.put(
  '/:id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      brand: Joi.string().lowercase().required(),
      model: Joi.string().lowercase().required(),
      year: Joi.number().required(),
      fuel: Joi.string().lowercase().required(),
      color: Joi.string().lowercase().required(),
      price: Joi.number().required(),
      category: Joi.string().lowercase(),
    },
  }),
  vehicleController.update,
);

vehiclesRouter.delete(
  '/:id',
  EnsureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  vehicleController.delete,
);

export default vehiclesRouter;
