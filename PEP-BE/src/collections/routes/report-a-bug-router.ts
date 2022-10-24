import { Router } from 'express';
import ReportABug from '../controllers/report-a-bug-controller';
import verifyAccessToken from '../../middlewares/verify-token';

const router = Router();
router.post('/', verifyAccessToken, ReportABug.createBugReport);
router.get('/', verifyAccessToken, ReportABug.getBugReport);
router.delete('/:id', verifyAccessToken, ReportABug.deleteBugReport);

export default router;
