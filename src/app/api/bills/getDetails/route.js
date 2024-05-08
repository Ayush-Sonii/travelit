import Bill from "@/models/expenses";
import {connect} from  '@/dbConfig/dbConfig';
import { NextResponse } from "next/server";

connect();
export async function GET(req){
    try{
        const {searchParams} = new URL(req.url);
        const billId = searchParams.get("billId");
        // console.log(groupId);
        const resp = await Bill.findOne({billId});
        return NextResponse.json({resp});
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
    
}