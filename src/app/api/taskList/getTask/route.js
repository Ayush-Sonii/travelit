import Room from "@/models/tasklist";
import {connect} from  '@/dbConfig/dbConfig';
import { NextResponse } from "next/server";

connect();
export async function GET(req){
    try{
        const {searchParams} = new URL(req.url);
        const roomId = searchParams.get("roomId");
        // console.log(groupId);
        const resp = await Room.findOne({roomId});
        return NextResponse.json({resp});
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
    
}