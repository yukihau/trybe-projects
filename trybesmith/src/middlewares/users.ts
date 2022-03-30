import { NextFunction, Request, Response } from 'express';

export const validateUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  switch (true) {
    case (!username):
      return res.status(400).json({ error: 'Username is required' });
    case (typeof username !== 'string'):
      return res.status(422).json({ error: 'Username must be a string' });
    case (username.length <= 2):
      return res.status(422).json({ error: 'Username must be longer than 2 characters' });
    default:
      next();
  }
};

export const validateClasse = (req: Request, res: Response, next: NextFunction) => {
  const { classe } = req.body;

  switch (true) {
    case (!classe):
      return res.status(400).json({ error: 'Classe is required' });
    case (typeof classe !== 'string'):
      return res.status(422).json({ error: 'Classe must be a string' });
    case (classe.length <= 2):
      return res.status(422).json({ error: 'Classe must be longer than 2 characters' });
    default:
      next();
  }
};

export const validateLevel = (req: Request, res: Response, next: NextFunction) => {
  const { level } = req.body;

  switch (true) {
    case (!level && level !== 0):
      return res.status(400).json({ error: 'Level is required' });
    case (typeof level !== 'number'):
      return res.status(422).json({ error: 'Level must be a number' });
    case (level <= 0):
      return res.status(422).json({ error: 'Level must be greater than 0' });
    default:
      next();
  }
};

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  switch (true) {
    case (!password):
      return res.status(400).json({ error: 'Password is required' });
    case (typeof password !== 'string'):
      return res.status(422).json({ error: 'Password must be a string' });
    case (password.length <= 7):
      return res.status(422).json({ error: 'Password must be longer than 7 characters' });
    default:
      next();
  }
};
