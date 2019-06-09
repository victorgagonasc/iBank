import { Router } from 'express';
import AccountController from '../controllers/account.controller';
import verifyJWT from '../middlewares/auth.validator';

const router = Router();

router.get('/statement', verifyJWT, AccountController.getStatement);
router.post('/transfer', verifyJWT, AccountController.newTransfer);

export default router;