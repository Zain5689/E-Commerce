import { Router } from 'express';
import { HomeController } from './home.controller';

const router = Router();

router.get('/', HomeController.getHomeData);

export default router;
