import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

// @ts-ignore
router.post('/register', registerUser);
// @ts-ignore
router.post('/login', loginUser);

export default router;
