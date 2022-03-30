import { Router } from 'express';
import UsersController from '../controllers/users';
import {
  validateUsername,
  validateClasse,
  validateLevel,
  validatePassword,
} from '../middlewares/users';

const controller = new UsersController();

const router = Router();

router.post(
  '/',
  validateUsername,
  validateClasse,
  validateLevel,
  validatePassword,
  controller.create,
);

export default router;
