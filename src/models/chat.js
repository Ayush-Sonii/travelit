import mongoose from 'mongoose';

const chatSchema  = mongoose.Schema({
    sender:{
        type: String,
        required:[true,"Please provide sender's name"]
    },
    groupId:{
        type: String,
        ref: 'group',
    },
    message:{
        type: String,
        required: [true,"Please provide message"],
    },
    sendAt:{
        type: Date,
        default: Date.now,
    }
})

const Chat = mongoose.models.Chat || mongoose.model('Chat',chatSchema);

export default Chat;