import { Router } from 'express';
import UserController from '../controllers/user.controller';
import verifyJWT from '../middlewares/auth.validator';

const router = Router();

router.get('/', verifyJWT, UserController.getAll);
router.get('/:id', verifyJWT, UserController.getById);
router.post('/', UserController.add);

export default router;