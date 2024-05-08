import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/usermodel';
import { NextResponse } from 'next/server';
import {sendEmail} from '@/app/mailer';

connect();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        console.log(email);
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"User not exsist"},{status:400}); 
        }

        await sendEmail({email,emailType:'RESET',userId:user._id});

        return NextResponse.json({
            message: "User authenticated",
            sucess: true
        });
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}