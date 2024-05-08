import Room from "@/models/tasklist";
import {connect} from  '@/dbConfig/dbConfig';
import {NextResponse} from 'next/server';

connect();
export async function POST(request){
    try {
        const reqBody = await request.json();
        const {roomId,userEmail,tasks} = reqBody;

        if(userEmail){
            const room = new Room({
                roomId,
                user:userEmail,
                taskList:tasks,
                createdAt:Date.now(),
            })
            
            const savedRoom = await room.save();
            return NextResponse.json({
                message: "Information saved",
                sucess: true,
                savedRoom
            })
        }

        const updatedRoom = await Bill.findOneAndUpdate({roomId},{
            taskList:tasks,
            createdAt:Date.now(),
        },{new:true});

        return NextResponse.json({
            message: "Information updated",
            sucess: true,
            updatedRoom
        })
        
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
    
} 