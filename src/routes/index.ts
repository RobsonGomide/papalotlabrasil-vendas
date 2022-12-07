import { Router } from 'express';
import * as PageController from '../controllers/pageController';
import * as SearchController from '../controllers/searchController';

const router = Router();

router.get('/', PageController.home);
router.get('/municipios', PageController.municipios);
router.get('/vendedores', PageController.vendedores);

export default router;