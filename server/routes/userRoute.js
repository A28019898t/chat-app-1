import express from 'express';
const router = express.Router();
import { register, login, setAvatar, getAllUser } from '../controllers/userController.js'

router.post('/register', register);
router.post('/login', login)
router.post('/setAvatar/:userId', setAvatar);
router.get('/allUser/:userId', getAllUser);

export default router;
