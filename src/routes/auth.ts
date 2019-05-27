import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import verifyJWT from '../middlewares/auth.validator';

const router = Router();

router.post('/signin', AuthController.signIn);
router.post('/signout', verifyJWT, AuthController.signOut);

export default router;