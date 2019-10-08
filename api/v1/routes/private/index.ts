import { Router } from 'express';
import passport from 'passport';
import { secret } from './secret';

const router = Router();

router.get('/secret', passport.authenticate('jwt', { session: false }), secret);

export default router;
