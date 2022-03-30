import { Router } from 'express';
import ProductsController from '../controllers/products';
import { validateProperties, validateTypes, validateLengthOfValues } from '../middlewares/products';

const controller = new ProductsController();

const router = Router();

router.get('/', controller.getAll);
router.post(
  '/',
  validateProperties,
  validateTypes,
  validateLengthOfValues,
  controller.create,
);

export default router;
