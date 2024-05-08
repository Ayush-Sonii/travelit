import {connect} from  '@/dbConfig/dbConfig';
import {NextResponse} from 'next/server';
import User  from '@/models/usermodel';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

connect();
export async function POST(request){
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User not exsist"},{status: 400});
        }

        const validatePass = await bycrypt.compare(password,user.password);
        if(!validatePass){
            return NextResponse.json({error: "Invalid Password"},{status: 400});
        }

        const tokenData = {
            id:user._id,
        }
        const token  = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"});

        const response = NextResponse.json({
            message: `Login successful Pass: ${password} UserPass: ${user.password}`,
            success: true
        })

        response.cookies.set("token",token,{httpOnly:true});

        return response;
    } 
    catch (e) {
        return NextResponse({error:e.message},{status:500})
    }
}