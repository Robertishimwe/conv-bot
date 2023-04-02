import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommandSchema = new Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
   

    command: {
        type: String
    },

    value: {
        type: String 
    },

    status: {
        type: String,
        enum: ['approved', 'rejected', 'pending'],
        default: 'approved'
    },

    CreatedDate: {
        type: Date,
        default: Date.now(),
    },
});


const Command = mongoose.model('Command', CommandSchema);

export default Command;