import { Router } from 'express';

const router = Router();

router.get('/profile', (req, res) => {
  res.json('profile');
});

export default router;
