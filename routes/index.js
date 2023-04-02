import { Router } from 'express';
import chatRoutes from './chatRoutes.js';
import commandRoutes from './commandRoutes.js';


const router = Router();


router.use('/chat', chatRoutes)
router.use('/command', commandRoutes)


export default router;