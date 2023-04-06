import { Router } from 'express';
import passport from 'passport';
import googleController from '../controller/googleAuth'
// import LinkedinController from '../controller/LinkedinAuth';
// import TwitterController from '../controller/twitterAuth';
// import AuthController from '../controller/Auth'
// import authValidation from '../validations/auth.validation'
// import ForgotPasswordController from '../controller/forgotPassword';

// const { registrationValidation, loginValidation } = authValidation;
//import routes


const router = Router();

//section routing     
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), googleController.onSuccess)
// router.get('/linkedin', passport.authenticate('linkedin'));
// router.get('/auth/linkedin/callback',passport.authenticate('linkedin', { failureRedirect: '/login'}), LinkedinController.onSuccess);
// router.get('/twitter', passport.authenticate('twitter', { scope: ['profile', 'email'] }));
// router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/failed' }), TwitterController.onSuccess)
// router.post('/send/forgot-password', validateEmail, sendResetPasswordEmail);   template

export default router; 