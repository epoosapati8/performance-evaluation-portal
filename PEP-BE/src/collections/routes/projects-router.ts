import { Router } from 'express';
import verifyAccessToken from '../../middlewares/verify-token';
import Projects from '../controllers/projects-controller';

const router = Router();
router.post('/', verifyAccessToken, Projects.createProject);
router.get('/:year/:quarter/:managerId', verifyAccessToken, Projects.getProjectListByQuarter);
router.get('/hr/:year/:quarter/:hrId', verifyAccessToken, Projects.getProjectListByHrId);
router.get('/:year/:quarter', verifyAccessToken, Projects.getProjectList);
router.put('/:id', verifyAccessToken, Projects.updateProject);
router.delete('/:id', verifyAccessToken, Projects.deleteProject);

export default router;
