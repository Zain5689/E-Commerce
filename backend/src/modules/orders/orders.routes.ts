import { Router } from 'express';
import { OrdersController } from './orders.controller';
import { authenticate, optionalAuthenticate } from '../../common/middleware/authGuard';

const router = Router();

router.post('/', optionalAuthenticate, OrdersController.createOrder);
router.get('/my-orders', authenticate, OrdersController.getMyOrders);
router.get('/my-stats', authenticate, OrdersController.getMyStats);
router.get('/:id', optionalAuthenticate, OrdersController.getOrderById);

export default router;
