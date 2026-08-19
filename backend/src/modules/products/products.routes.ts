import { Router } from 'express';
import { ProductsController } from './products.controller';

const router = Router();

router.get('/', ProductsController.getProducts);
router.get('/autocomplete', ProductsController.getAutocomplete);
router.get('/:slug', ProductsController.getProductBySlug);

export default router;
