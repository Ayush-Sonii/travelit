import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "Please enter your name"],
    },
    lname : String,
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password : {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.User || mongoose.model('User',userSchema);

export default User;