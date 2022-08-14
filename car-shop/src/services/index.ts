import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError;
}

abstract class Service<T> {
  constructor(protected model: Model<T>) {}

  create = async (obj: T): Promise<T | ServiceError> => this.model.create(obj);

  read = async (): Promise<T[]> => this.model.read();

  readOne = async (id: string): Promise<T | null | ServiceError> =>
    this.model.readOne(id);

  update = async (id: string, obj: T): Promise<T | null | ServiceError> =>
    this.model.update(id, obj);

  delete = async (id: string): Promise<T | null | ServiceError> =>
    this.model.delete(id);
}

export default Service;
