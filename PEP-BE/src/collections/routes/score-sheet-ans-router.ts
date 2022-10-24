import { Router } from 'express';
import verifyAccessToken from '../../middlewares/verify-token';
import ScoreSheetAnswers from '../controllers/score-sheet-ans-controller';

const router = Router();
router.post('/', verifyAccessToken, ScoreSheetAnswers.createScoreSheetAns);
router.get('/:empId/:year/:quarter', verifyAccessToken, ScoreSheetAnswers.getScoreSheetAnsByEmpId);
router.get(
  '/average/:year/:quarter/:projectName',
  verifyAccessToken,
  ScoreSheetAnswers.getAvgScoreAnsByProject
);
router.get(
  '/:empId/:year/:quarter/:projectName',
  verifyAccessToken,
  ScoreSheetAnswers.getScoreSheetAnsByProject
);
router.put('/', verifyAccessToken, ScoreSheetAnswers.updateScoreSheetAns);
router.delete('/:id', verifyAccessToken, ScoreSheetAnswers.deleteScoreSheetAns);

export default router;
