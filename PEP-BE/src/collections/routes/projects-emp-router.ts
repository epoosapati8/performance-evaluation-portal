import { Router } from 'express';
import verifyAccessToken from '../../middlewares/verify-token';
import ProjectsEmp from '../controllers/projects-emp-controller';

const router = Router();
router.post('/', verifyAccessToken, ProjectsEmp.createProjectEmp);
router.get(
  '/:year/:quarter/:projectName',
  verifyAccessToken,
  ProjectsEmp.getProjectEmpByProjectName
);
router.get('/analysis/:year/:quarter/:projectName', verifyAccessToken, ProjectsEmp.getTotalScore);
router.get(
  '/analysis/:year/:quarter/:projectName/:designation',
  verifyAccessToken,
  ProjectsEmp.getTotalScoreByDesignation
);
router.get('/:id/:year/:quarter', verifyAccessToken, ProjectsEmp.getProjectEmpByProjectId);
router.put('/:id', verifyAccessToken, ProjectsEmp.updateProjectEmp);
router.delete('/:id', verifyAccessToken, ProjectsEmp.deleteProjectEmp);

export default router;
