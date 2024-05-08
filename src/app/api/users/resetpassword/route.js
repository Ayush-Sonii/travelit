import {connect} from '@/dbConfig/dbConfig'
import  User from '@/models/usermodel';
import { NextResponse } from 'next/server';

connect();

export async function POST(request){
    try {
        const reqBody = request.json();
        const {token,password} = reqBody;

        const user = await User.findOne({forgetPasswordToken: token,forgetPasswordTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({error:"Invalid Token"},{status: 400});
        }

        user.password = password;
        user.forgetPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password Updated",
            sucess: true
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status: 500})
    }
}