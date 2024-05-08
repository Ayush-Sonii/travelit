import Group from "@/models/group";
import {connect} from  '@/dbConfig/dbConfig';
import {NextResponse} from 'next/server';
import User from "@/models/usermodel";
import Chat from "@/models/chat";

connect();
export async function POST(request){
    try {
        const reqBody = await request.json();
        const {userEmail,groupName,members} = reqBody;
        const groupId = Math.floor(Math.random()*Date.now()).toString(36).substring(2, 15);
        const createdAt = new Date(Date.now());
        const user = await User.findOne({email:userEmail});
        //console.log(user);
        members.unshift(user.fname);
        const chat = new Chat({
            sender:"System",
            groupId:groupId,
            message:`${user.fname} created this group on ${createdAt.getDate()}/${createdAt.getMonth()+1}/${createdAt.getFullYear()}`,
            sendAt:Date.now(),
        })
        const savedChat = await chat.save();
        
        const group = new Group({
            groupId,
            user:userEmail,
            groupName,
            members,
            chats:savedChat._id,
            createdAt:createdAt,
        })

        const savedGroup =  await group.save();
        
        // const updatedGroup = await Group.findOneAndUpdate({groupId:groupId},{$push:{chats:savedChat._id}},{new:true});
        return NextResponse.json({
            message: "Group created successfully",
            sucess: true,
            savedGroup
        })
        
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
    
} 