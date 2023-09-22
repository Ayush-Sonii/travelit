import {NextResponse} from 'next/server';
// import { getCsrfToken } from "next-auth/react"
// import { signOut } from 'next-auth/react';

export async function GET(){
    try{
        // signOut();
        // const csrfToken = await getCsrfToken({ req });
        // if(csrfToken){
        //     csrfToken.res.setHeader(
        //         "Set-Cookie", [
        //         `WebsiteToken=deleted; Max-Age=0`,
        //         `AnotherCookieName=deleted; Max-Age=0`]
        //       );
        // }
        const response = NextResponse.json({
            message: "Logout Sucessfull",
            sucess:true
        })
        response.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0)
        })
        response.cookies.set("next-auth.session-token","",{
            httpOnly: true,
            expires: new Date(0)
        })
        return response;
    }
    catch(e){
        return NextResponse.json({error:e.message},{status:500});
    }
    
}
