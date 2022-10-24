import { Router } from 'express';
import Designation from '../controllers/designations-controller';
import verifyAccessToken from '../../middlewares/verify-token';
const router = Router();
router.post('/', verifyAccessToken, Designation.createDesignation);
router.get('/desig', verifyAccessToken, Designation.getDesignation);
router.get('/', verifyAccessToken, Designation.getAllDesignation);

export default router;
