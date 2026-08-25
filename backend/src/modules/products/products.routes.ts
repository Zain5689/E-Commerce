import { Router } from 'express';
import { ProductsController } from './products.controller';

const router = Router();

router.get('/', ProductsController.getProducts);
router.get('/flash-deals', ProductsController.getFlashDeals);
router.get('/featured', ProductsController.getFeatured);
router.get('/autocomplete', ProductsController.getAutocomplete);
router.get('/:id', ProductsController.getProductByIdOrSlug);
router.post('/:id/reviews', ProductsController.addReview);

export default router;
