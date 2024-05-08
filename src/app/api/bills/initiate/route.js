import Bill from "@/models/expenses";
import {connect} from  '@/dbConfig/dbConfig';
import {NextResponse} from 'next/server';
import User from "@/models/usermodel";

connect();
export async function POST(request){
    try {
        const reqBody = await request.json();
        const {userEmail,peopleData} = reqBody;
        const billId = Math.floor(Math.random()*Date.now()).toString(36).substring(2, 15);
        const user = await User.findOne({email:userEmail});
        //console.log(user);
        peopleData.unshift({name:user.fname,netAmount:0});
        
        const bill = new Bill({
            billId,
            user:userEmail,
            memberData:peopleData,
        })

        const savedBill =  await bill.save();
        
        return NextResponse.json({
            message: "Bill initiate successfully",
            sucess: true,
            savedBill
        })
        
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
    
} 