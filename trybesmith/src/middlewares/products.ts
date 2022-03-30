import { NextFunction, Request, Response } from 'express';
import { Product } from '../interfaces/products';

export const validateProperties = (req: Request, res: Response, next: NextFunction) => {
  const product: Product = req.body;

  switch (true) {
    case (!product.name):
      return res.status(400).json({ error: 'Name is required' });
    case (!product.amount):
      return res.status(400).json({ error: 'Amount is required' });
    default:
      next();
  }
};

export const validateTypes = (req: Request, res: Response, next: NextFunction) => {
  const product: Product = req.body;

  switch (true) {
    case (typeof product.name !== 'string'):
      return res.status(422).json({ error: 'Name must be a string' });
    case (typeof product.amount !== 'string'):
      return res.status(422).json({ error: 'Amount must be a string' });
    default:
      next();
  }
};

export const validateLengthOfValues = (req: Request, res: Response, next: NextFunction) => {
  const product: Product = req.body;

  switch (true) {
    case (product.name.length <= 2):
      return res.status(422).json({ error: 'Name must be longer than 2 characters' });
    case (product.amount.length <= 2):
      return res.status(422).json({ error: 'Amount must be longer than 2 characters' });
    default:
      next();
  }
};
