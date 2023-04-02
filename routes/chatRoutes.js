import { Router } from 'express';

import chatControllers from '../controller/chatController.js'


const router = Router();


router.post('/', chatControllers.chat)



export default router;