import passport from 'passport';
import Token from '../helper/token.js';
import userService from '../services/userService.js';
import '../services/googlePassport.js' 


passport.use(passport.initialize());
passport.use(passport.session());

const { createUser, findUser } = userService;
const { generateToken } = Token;

class googleController {
	static onSuccess = async (req, res) => {
		try {
			const { name, id, email, displayName, photos } = req.user;

			const newUser = {
				profilePicture: photos.value,
				userName: displayName,
				googleId: id,
				Role: 'basic_user',
				email,
			};

			console.log(newUser)

			const user = (await findUser(email)) || (await createUser(newUser));
			const tokenPackage = {
				name: user.userName,
				id: user._id,
				Role: user.Role,
				email: user.email,
			};
			const token = await generateToken(
				tokenPackage,
				process.env.TOKEN_SECRET,
				process.env.EXPIRATION
			);
			res.redirect(`${process.env.RIDIRECT}/${token}`);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	};
}

export default googleController;
