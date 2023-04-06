import User from '../model/user.js';

class userService {
	static createUser = async (data) => {
		const user = new User(data);
		try {
			await user.save();
			return user;
		} catch (error) {
			throw new Error(error);
		}
	};

	static findUser = async (data) => {
		const user = await User.findOne({ email: data });
		if (user) return user;
	};

	static checkUser = async (query) => {
		const user = await User.findOne(query);
		if (user) return user;
	}
	static updateUser = async (prevUser, updatedUser) => {
		Object.assign(prevUser, updatedUser);
		return await prevUser.save();
	}
}

export default userService;
