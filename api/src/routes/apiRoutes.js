import { Router } from 'express';
import { getArtisan, getArtisans, getCategories, getTopArtisans, postContact } from '../controllers/apiController.js';

const router = Router();
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

router.get('/categories', asyncRoute(getCategories));
router.get('/artisans/top', asyncRoute(getTopArtisans));
router.get('/artisans', asyncRoute(getArtisans));
router.get('/artisans/:id', asyncRoute(getArtisan));
router.post('/artisans/:id/contact', asyncRoute(postContact));

export default router;
