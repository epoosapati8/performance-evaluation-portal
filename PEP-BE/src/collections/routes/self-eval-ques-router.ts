import { Router } from 'express';
import verifyAccessToken from '../../middlewares/verify-token';
import verifyRole from '../../middlewares/verify-role';
import SelfEvalQues from '../controllers/self-eval-ques-controller';
const router = Router();
router.post('/', verifyAccessToken, verifyRole, SelfEvalQues.createSelfEvalQues);
router.get('/:year/:quarter', verifyAccessToken, SelfEvalQues.getSelfEvalQues);
router.put('/', verifyAccessToken, SelfEvalQues.updateSelfEvalQues);
router.delete('/:id', verifyAccessToken, SelfEvalQues.deleteSelfEvalQues);
router.get('/status/:year/:quarter', verifyAccessToken, SelfEvalQues.getStatus);

export default router;
