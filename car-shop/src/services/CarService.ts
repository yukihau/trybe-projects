import Service, { ServiceError } from '.';
import { Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

class CarService extends Service<Car> {
  constructor(public model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError> => {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) return { error: parsed.error };

    const result = await this.model.create(obj);
    return result;
  };

  update = async (id: string, obj: Car): Promise<Car | null | ServiceError> => {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) return { error: parsed.error };

    const result = await this.model.update(id, obj);
    return result;
  };
}

export default CarService;
