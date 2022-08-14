import { NextFunction, Request, Response } from 'express';
import * as emailValidator from 'email-validator';

const INCORRECT_VALUES = 'Incorrect email or password';
const UNFILLED_FIELDS = 'All fields must be filled';

export default class UserMiddleware {
  private itExists = (value: string | number) =>
    value !== null && value !== undefined && value !== '';

  public validateIfFieldsExist = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { body } = req;
    const emailExists = this.itExists(body.email);
    const passwordExists = this.itExists(body.password);
    if (!emailExists) return res.status(400).json({ message: UNFILLED_FIELDS });
    if (!passwordExists) return res.status(400).json({ message: UNFILLED_FIELDS });
    next();
  };

  public validateEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email } = req.body;
    const emailIsValid = emailValidator.validate(email);
    if (!emailIsValid) return res.status(401).json({ message: INCORRECT_VALUES });
    next();
  };

  public validatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { password } = req.body;
    const passwordIsValid = typeof password === 'string';
    if (!passwordIsValid) return res.status(401).json({ message: INCORRECT_VALUES });
    next();
  };
}
