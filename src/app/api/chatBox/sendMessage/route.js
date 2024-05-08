import Group from "@/models/group";
import {connect} from  '@/dbConfig/dbConfig';
import {NextResponse} from 'next/server';
import Chat from "@/models/chat";

connect();
export async function POST(request){
    try {
        const reqBody = await request.json();
        const {groupId,userName,message} = reqBody;

        const chat = new Chat({
            sender:userName,
            groupId:groupId,
            message:message,
            sendAt:Date.now(),
        })

        const savedChat = await chat.save();
        
        const updatedGroup = await Group.findOneAndUpdate({groupId:groupId},{$push:{chats:savedChat._id}},{new:true});

        return NextResponse.json({
            message: "Message saved",
            sucess: true,
            savedChat
        })
        
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
    
} 