import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    user: {
        type: String
    },
   
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    message: {
        type: String 
    },

    CreatedDate: {
        type: Date,
        default: Date.now(),
    },
});


const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;