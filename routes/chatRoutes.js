import { Router } from 'express';
import verify  from '../middleware/verify.js';

import chatControllers from '../controller/chatController.js'
import { createChatCompletion } from '../services/api.js'


const router = Router();


router.post('/', chatControllers.chat)
router.post('/test',verify, chatControllers.chat)
router.get('/sso', createChatCompletion )



export default router;