import { Router } from 'express';
import verify from '../middleware/verify';

import chatControllers from '../controller/chatController.js'


const router = Router();


router.post('/',verify, chatControllers.chat)



export default router;