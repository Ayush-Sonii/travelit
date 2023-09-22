import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { NextResponse } from "next/server";
import  User from "@/models/usermodel";
import { connect } from "@/dbConfig/dbConfig";
import bycrypt from 'bcryptjs';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECERET,
        }),
    ],
    callbacks: {
        async session({session}){
            return session;
        },
        async signIn({profile}){
            console.log(profile);
            try {
                await connect();
                console.log('running');
                const user = await User.findOne({email:profile.email});
                if(!user){
                    const tempPass = 'whateveryouwant';
                    const salt = await bycrypt.genSalt(10);
                    const hashedPass = await bycrypt.hash(tempPass,salt);

                    const newUser = new User({
                        fname: profile.given_name,
                        lname: profile.family_name,
                        email: profile.email,
                        password: hashedPass
                    })

                    const savedUser = await newUser.save();
                }
                // const tokenData = {
                //     id:savedUser._id,
                // }
                // const token  = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"});
        
                const response = NextResponse.json({
                    message: "Login successful",
                    success: true
                })
        
                // response.cookies.set("token",token,{httpOnly:true});
        
                return response;
                
            } catch (error) {
                console.log(error.message);
                return NextResponse({error:e.message},{status:500});
            }
        }
    }
})

export { handler as GET, handler as POST };