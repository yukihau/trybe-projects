import { Router } from 'express';
import productsRouter from './products';
import usersRouter from './users';
import ordersRouter from './orders';

const router = Router();

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);

export default router;
