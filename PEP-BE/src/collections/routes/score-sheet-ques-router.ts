import { Router } from 'express';
import verifyAccessToken from '../../middlewares/verify-token';
import verifyRole from '../../middlewares/verify-role';
import ScoreSheetQuesUsers from '../controllers/score-sheet-ques-controller';
const router = Router();
router.post('/', verifyAccessToken, verifyRole, ScoreSheetQuesUsers.createScoreSheetQues);
router.get('/:year/:quarter', verifyAccessToken, ScoreSheetQuesUsers.getScoreSheetQues);
router.put('/:id', verifyAccessToken, ScoreSheetQuesUsers.updateScoreSheetQues);
router.delete('/:id', verifyAccessToken, ScoreSheetQuesUsers.deleteScoreSheetQues);
router.get('/status/:year/:quarter', verifyAccessToken, ScoreSheetQuesUsers.getStatus);

export default router;
