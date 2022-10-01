import express from 'express';
import {signupUser, loginUser} from '../controllers/user.js';

const router = express.Router();

//google sign in 
//router.post('/', addUser);

router.post('/signup', signupUser);
router.post('/login', loginUser);

export default router;