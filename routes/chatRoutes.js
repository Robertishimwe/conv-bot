import { Router } from 'express';
import verify from '../middleware/verify.js';

import chatControllers from '../controller/chatController.js'


const router = Router();


router.post('/', chatControllers.chat)
router.post('/test',verify, chatControllers.chat)



export default router;