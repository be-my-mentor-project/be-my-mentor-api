import { Router } from 'express';

const router = Router();

router.get('/login', (req, res) => {
  res.json('login');
});

export default router;
