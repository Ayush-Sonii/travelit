import Trip from "@/models/travel";
// import User from "@/models/usermodel";
import {connect} from  '@/dbConfig/dbConfig';
import {NextResponse} from 'next/server';

connect();
export async function POST(request){
    try {
        const reqBody = await request.json();
        // const {email,tN,sD,eD,src,dst,bgt,itinerary} = reqBody;
        const {userEmail,tripName,startDate,endDate,source,destination,budget,response} = reqBody;

        // const trip = new Trip({
        //     user:email,
        //     tripName:tN,
        //     startDate: sD,
        //     endDate: eD,
        //     source: src,
        //     destination:dst,
        //     budget:bgt,
        //     itinerary:itinerary,
        // })
        const trip = new Trip({
            user:userEmail,
            tripName,
            startDate,
            endDate,
            source,
            destination,
            budget,
            itinerary:response,
        })

        const savedTrip =  await trip.save();

        return NextResponse.json({
            message: "Trip created successfully",
            sucess: true,
            savedTrip
        })
        
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
    
} 