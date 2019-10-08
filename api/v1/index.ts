import { Router } from 'express';

import publicRoutes from './routes/public';
import privateRoutes from './routes/private';

const router = Router();

router.use(privateRoutes);
router.use(publicRoutes);

export default router;
