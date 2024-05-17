import { Router } from 'express';
import { stats, statsByUserId, bestPlayers } from '../controllers/user';

const router = Router();

router.get('/stats', stats);
router.get('/stats/:id', statsByUserId);
router.get('/best-players', bestPlayers);

export default router;