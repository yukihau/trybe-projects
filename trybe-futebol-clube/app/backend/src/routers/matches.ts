import { Router } from 'express';
import MatchController from '../controllers/match';

const controller = new MatchController();

const router = Router();

router.get(
  '/',
  controller.getAll,
);

router.post(
  '/',
  controller.create,
);

router.patch(
  '/:id',
  controller.updateMatch,
);

router.patch(
  '/:id/finish',
  controller.finishMatch,
);

export default router;
