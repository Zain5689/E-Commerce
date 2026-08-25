import { Router } from 'express';
import { AddressesController } from './addresses.controller';
import { authenticate } from '../../common/middleware/authGuard';

const router = Router();

router.use(authenticate);

router.get('/', AddressesController.getAddresses);
router.post('/', AddressesController.createAddress);
router.put('/:id', AddressesController.updateAddress);
router.delete('/:id', AddressesController.deleteAddress);
router.patch('/:id/default', AddressesController.setDefault);

export default router;
