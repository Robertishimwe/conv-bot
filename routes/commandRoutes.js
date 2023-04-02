import { Router } from 'express';

import commandControllers from '../controller/commandController.js'


const router = Router();


router.post('/create', commandControllers.createCommand)
router.get('/get-all', commandControllers.findAllCommand)
router.get('/get/:command', commandControllers.findCommand)



export default router;