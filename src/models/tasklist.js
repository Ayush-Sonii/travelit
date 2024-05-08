import mongoose from 'mongoose';
import { type } from 'os';

const roomSchema  = mongoose.Schema({
    roomId:{
        type: String,
        required: [true,"Please provide Room id"],
        unique: true,
    },
    user:{
        type: String,
        required: [true,"Please provide user's data"],
        ref: 'user',
    },
    taskList:{
        type:Array,
        required:[true,"Please provide member's data"]
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const Room = mongoose.models.Room || mongoose.model('Room',roomSchema);

export default Room;