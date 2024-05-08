import Group from "@/models/group";
import {connect} from  '@/dbConfig/dbConfig';
import { NextResponse } from "next/server";

connect();
export async function GET(req){
    try{
        const {searchParams} = new URL(req.url);
        const email = searchParams.get("email");

        const resp = await Group.find({user:email});
        return NextResponse.json({resp});
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
    
}