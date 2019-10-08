import { Router } from 'express';
import { login } from './auth';

const router = Router();

router.post('/login', login);

router.post('/logout', function(req, res){
  req.logout();
  res.json({ success: true, content: null });
});

export default router;
