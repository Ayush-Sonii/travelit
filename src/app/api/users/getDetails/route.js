import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/usermodel';
import Trip from '@/models/travel';
import Group from '@/models/group';
import Bill from '@/models/expenses';
import Room from '@/models/tasklist';
import { NextResponse } from 'next/server';

connect();

export async function GET(req){
    try {
        const {searchParams} = new URL(req.url);
        const email = searchParams.get("email");
        // console.log(param)
        // console.log(email);
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"User not exsist"},{status:400}); 
        }

        // await sendEmail({email,emailType:'RESET',userId:user._id});
        const allTrips = await Trip.find({user:email});
        const allGroups = await Group.find({user:email});
        const allBills = await Bill.find({user:email});
        const allRooms = await Room.find({user:email});
        
        const res = {
            ...user,
            trips: allTrips,
            groups:allGroups,
            bills:allBills,
            tasklists:allRooms,
        }
        //res.trips = trips;
        
        // user.trips = trips;
        // Object.assign(user, {trips})
        // console.log(res);
        return NextResponse.json({res});
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}