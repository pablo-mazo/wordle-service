import { Router } from 'express';
import { compare, best } from '../controllers/word';
import validateActiveWord from '../middleware/validateActiveWord';

const router = Router();

router.use(validateActiveWord);

router.get('/best', best);
router.post('/compare', compare);

export default router;