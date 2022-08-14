import { Router } from 'express';
import loginRouter from './login';
import teamsRouter from './teams';
import matchesRouter from './matches';
import leaderboardRouter from './leaderboard';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
