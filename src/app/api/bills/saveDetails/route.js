import Bill from "@/models/expenses";
import {connect} from  '@/dbConfig/dbConfig';
import {NextResponse} from 'next/server';

connect();
export async function POST(request){
    try {
        const reqBody = await request.json();
        const {billId,peopleData,expenses,transactions,billPaid} = reqBody;
        
        
        const updatedbill = await Bill.findOneAndUpdate({billId:billId},{
            memberData:peopleData,
            expenses,
            transactions,
            settled:billPaid,
        },{new:true});

        return NextResponse.json({
            message: "Information saved",
            sucess: true,
            updatedbill
        })
        
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
    
} 