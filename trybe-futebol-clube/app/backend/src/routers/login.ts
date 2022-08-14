import { Router } from 'express';
import UserController from '../controllers/user';
import UserMiddleware from '../middlewares/user';

const controller = new UserController();
const middleware = new UserMiddleware();

const router = Router();

router.post(
  '/',
  middleware.validateIfFieldsExist,
  middleware.validateEmail,
  middleware.validatePassword,
  controller.login,
);

router.get('/validate', controller.validate);

export default router;
