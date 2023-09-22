import nodemailer from 'nodemailer';
import bycrypt from 'bcryptjs';
import User from '@/models/usermodel'

export const sendEmail = async({email,emailType,userId})=>{
    try {
        const hashedToken = await bycrypt.hash(userId.toString(),10);

        if(emailType=='VERIFY'){
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 36000,
            })
        } else if(emailType=='RESET'){
            await User.findByIdAndUpdate(userId,{
                forgetPasswordToken: hashedToken,
                forgetPasswordTokenExpiry: Date.now() + 36000,
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "241307dbaf931a",
              pass: "cbe53bf726afd8"
            }
          });

        const mailOptions = {
            from: 'noreply@travelit.com', 
            to: email, 
            subject: emailType=="VERIFY"?"Verify your email":"Reset your password",
            html: emailType=="VERIFY"?`<h1>Thank You for registering</h1><p>Click the button below to verify your email</p>
            <br/> <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"><button>Verify Email</button></a>`:
            `<p>Click the button below to verify your email</p>
            <br/> <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}"><button>Reset Password</button></a>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        
        console.log("Mail sent");
        
        return mailResponse;

    } catch (error) {
        console.log(error.message);
    }
}