import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard';

const controller = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  controller.getHomeLeaderboard,
);

router.get(
  '/away',
  controller.getAwayLeaderboard,
);

router.get(
  '/',
  controller.getAllLeaderboard,
);

export default router;
