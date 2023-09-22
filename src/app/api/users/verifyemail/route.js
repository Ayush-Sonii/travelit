import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/usermodel';
import { NextResponse } from 'next/server';
import { use } from 'react';

connect();

export async function POST(request){
    try {
        
        const req = await request.json();
        const {token} = req;

        const user = await User.findOne({verifyToken: token,verifyTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({error:'Invalid Token'},{status:400})
        }

        user.isVerified = true;
        user.forgetPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: 'Email Verified successfully',
            sucess: true,
        });
        

    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}