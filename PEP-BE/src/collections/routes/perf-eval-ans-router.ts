import { Router } from 'express';
import verifyAccessToken from '../../middlewares/verify-token';
import PerfEvalAnswers from '../controllers/perf-eval-ans-controller';

const router = Router();
router.get('/project/:empId/:year/:quarter', verifyAccessToken, PerfEvalAnswers.getSavedProjects);
router.post('/', verifyAccessToken, PerfEvalAnswers.createPerfEvalAns);
router.get('/:empId/:year/:quarter', verifyAccessToken, PerfEvalAnswers.getPerfEvalAnsByEmpId);
router.get(
  '/:empId/:year/:quarter/:projectName',
  verifyAccessToken,
  PerfEvalAnswers.getPerfEvalAnsByProject
);
router.put('/:id', verifyAccessToken, PerfEvalAnswers.updatePerfEvalAns);
router.delete('/:id', verifyAccessToken, PerfEvalAnswers.deletePerfEvalAns);

export default router;
