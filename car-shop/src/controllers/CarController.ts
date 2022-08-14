import { Response, Request } from 'express';
import Controller, { ResponseError, RequestWithBody } from '.';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarService';

class CarController extends Controller<Car> {
  private _route: string;

  constructor(service = new CarService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    const { body } = req;
    try {
      const result = await this.service.create(body);
      if (!result) return res.status(500).json({ error: this.errors.internal });
      if ('error' in result) return res.status(400).json(result);
      return res.status(201).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (_req: Request, res: Response<Car[] | ResponseError>) => {
    try {
      const result = await this.service.read();
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    const { id } = req.params;
    try {
      const result = await this.service.readOne(id);
      if (!result) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in result) return res.status(400).json(result);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const result = await this.service.update(id, body);
      if (!result) return res.status(404).json({ error: this.errors.notFound });
      if ('error' in result) return res.status(400).json(result);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    const { id } = req.params;
    try {
      const result = await this.service.delete(id);
      if (!result) return res.status(404).json({ error: this.errors.notFound });
      return res.status(204).json(result);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;
