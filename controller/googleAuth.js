import passport from 'passport';
import Token from '../helper/token';
import userService from '../services/userService';
import '../services/googlePassport' 


passport.use(passport.initialize());
passport.use(passport.session());

const { createUser, findUser } = userService;
const { generateToken } = Token;

class googleController {
	static onSuccess = async (req, res) => {
		try {
			const { name, id, email, displayName } = req.user;

			const newUser = {
				userName: displayName,
				googleId: id,
				Role: 'client',
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
