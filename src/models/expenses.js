import mongoose from 'mongoose';

const billSchema  = mongoose.Schema({
    billId:{
        type: String,
        required: [true,"Please provide Bill id"],
        unique: true,
    },
    user:{
        type: String,
        ref: 'user',
        required:[true,"Please provide user's detail"]
    },
    memberData:{
        type:Array,
        required:[true,"Please provide member's data"]
    },
    expenses:{
        type: Array,
        default:[],
    },
    transactions:{
        type: Array,
        default:[],
    },
    settled:{
        type: Boolean,
        default: false,
    }
})

const Bill = mongoose.models.Bill || mongoose.model('Bill',billSchema);

export default Bill;