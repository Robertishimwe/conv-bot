import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userName: {
		type: String,
		required: true,
		max: 30,
		min: 3,
	},
	email: {
		type: String,
		max: 30,
		min: 3,
	},

	googleId:{
		type: String,
	},

    profilePicture:{
        type: String
    },
	Role: {
		type: String,
		enum: ['basic_user','premium_user', 'admin'],
		required: true,
	},
	CreatedDate: {
		type: Date,
		default: Date.now(),
	},
});

const User = mongoose.model('User', UserSchema);

export default User;
