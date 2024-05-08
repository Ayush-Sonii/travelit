import mongoose from 'mongoose';
import Chat from "@/models/chat";

const groupSchema  = mongoose.Schema({
    groupId:{
        type: String,
        required: [true,"Please provide group id"],
        unique: true,
    },
    user:{
        type: String,
        ref: 'user',
        required:[true,"Please provide user's detail"]
    },
    groupName:{
        type: String,
        required: [true,"Please provide group name"],
    },
    members:{
        type:[String],
    },
    chats:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: Chat,
    }],
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const Group = mongoose.models.Group || mongoose.model('Group',groupSchema);

export default Group;