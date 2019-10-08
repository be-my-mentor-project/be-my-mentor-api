import { Router } from 'express';
import passport from 'passport';
import { secret } from './secret';
import { logout } from './auth';

const router = Router();

router.get('/secret', passport.authenticate('jwt', { session: false }), secret);
router.post('/logout', passport.authenticate('jwt', { session: false }), logout);

export default router;
