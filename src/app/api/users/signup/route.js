import {connect} from  '@/dbConfig/dbConfig';
import {NextResponse} from 'next/server';
import User  from '@/models/usermodel';
import bycrypt from 'bcryptjs';
import {sendEmail} from '@/app/mailer'

connect();

export async function POST(request){
    try{
        const reqBody = await request.json();
        const {fname,lname,email,password} = reqBody;
        
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exsist"},{status: 400});
        }

        const salt = await bycrypt.genSalt(10);
        const hashedPass = await bycrypt.hash(password,salt);

        const newUser = new User({
            fname,
            lname,
            email,
            password: hashedPass
        })

        const savedUser = await newUser.save();

        await sendEmail({email,emailType:'VERIFY',userId:savedUser._id});

        return NextResponse.json({
            message: "User created successfully",
            sucess: true,
            savedUser
        })
    }
    catch(e){
        return NextResponse.json({error: e.message},{status:500});
    }
}