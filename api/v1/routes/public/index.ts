import { Router } from 'express';
import { login, registration } from './auth';

const router = Router();

router.post('/login', login);
router.post('/registration', registration);

export default router;
