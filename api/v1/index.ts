import { Router } from 'express';

import publicRoutes from './routes/public';
import privateRoutes from './routes/private';

const router = Router();

router.use('/private', privateRoutes);
router.use('/public', publicRoutes);

export default router;
