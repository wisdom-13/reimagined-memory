import { Router } from "express";

import chat from './chat';
import room from './room';
import user from './user';

const router = Router();

router.use('/chat', chat);
router.use('/room', room);
router.use('/user', user);

export default router;