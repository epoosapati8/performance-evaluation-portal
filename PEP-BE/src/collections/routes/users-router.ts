import { Router } from 'express';
import Users from '../controllers/users-controller';
import UserValidation from '../validations/users-validation';
import ErrorMiddleware from '../../middlewares/error';
import verifyAccessToken from '../../middlewares/verify-token';
import verifyRefreshToken from '../../middlewares/verify-refresh-token';

const router = Router();
router.post(
  '/',
  ErrorMiddleware(UserValidation.checkUser, 'body'),
  verifyAccessToken,
  Users.createUser
);
router.get('/:userId', verifyAccessToken, Users.getUserById);
router.get('/', verifyAccessToken, Users.getAllUsers);
router.put(
  '/:userId',
  [
    ErrorMiddleware(UserValidation.checkUser, 'body'),
    ErrorMiddleware(UserValidation.checkId, 'params')
  ],
  verifyAccessToken,
  Users.updateUser
);
router.delete(
  '/:userId',
  ErrorMiddleware(UserValidation.checkId, 'params'),
  verifyAccessToken,
  Users.deleteUser
);
router.post('/auth', ErrorMiddleware(UserValidation.authUser, 'body'), Users.authenticateUser);
router.post('/gauth', Users.googleAuthenticateUser);
router.post('/token', verifyRefreshToken, Users.getNewToken);
router.post('/change-password', verifyAccessToken, Users.changePassword);

export default router;
