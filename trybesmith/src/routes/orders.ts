import { Router } from 'express';
import OrdersController from '../controllers/orders';

const controller = new OrdersController();

const router = Router();

router.get('/', controller.getAll);

export default router;
