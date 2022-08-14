import { Request, Response, NextFunction } from 'express';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  badRequest = 'Bad request',
  invalidId = 'Id must have 24 hexadecimal characters',
}

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) {}

  validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const regex = /[0-9A-Fa-f]{24}/g;
    const isHexadecimal = regex.test(id);
    if (!isHexadecimal) {
      return res.status(400).json({ error: this.errors.invalidId });
    }
    next();
  };

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract read(
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res>;

  abstract readOne(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract delete(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;
}

export default Controller;
