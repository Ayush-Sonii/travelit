// import Group from "@/models/group";
// import { connect } from "@/dbConfig/dbConfig";
// import { NextResponse } from "next/server";

// connect();

// export async function GET(req, res) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const groupId = searchParams.get("groupId");
//     console.log(groupId);
//     const group = await Group.findOne({ groupId: groupId }).populate("chats");
//     const initialData = JSON.stringify(group);

//     const events = (send) => {
//       send({ data: initialData });
      
//       const changeStream = Group.watch();
//       changeStream.on("change", async (change) => {
//         if (
//           change.operationType === "update" &&
//           change.updateDescription.updatedFields.chats
//         ) {
//           const updatedGroup = await Group.findOne({
//             groupId: change.documentKey._id,
//           }).populate("chats");
//           send({ data: JSON.stringify(updatedGroup) });
//         }
//       });
//     };

//     return NextResponse.stream(res, { events });
//   } catch (error) {
//     console.log(error.message);
//     return NextResponse.error({ status: 500, body: { error: error.message } });
//   }
// }

// import Group from "@/models/group";
// import { connect } from "@/dbConfig/dbConfig";
// import { NextResponse } from "next/server";

// connect();

// export async function GET(req, res) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const groupId = searchParams.get("groupId");
//     console.log(groupId);
//     const group = await Group.findOne({ groupId: groupId }).populate("chats");
//     res.setHeader("Content-Type", "text/event-stream");
//     res.setHeader("Cache-Control", "no-cache");
//     res.setHeader("Connection", "keep-alive");

//     const sendEventStreamData = (data) => {
//       res.write(`data: ${JSON.stringify(data)}\n\n`);
//     };

//     // Send initial group data
//     sendEventStreamData(group);

//     // Set up a change stream to listen for changes in the group's chats
//     const changeStream = Group.watch();
//     changeStream.on("change", async (change) => {
//       if (
//         change.operationType === "update" &&
//         change.updateDescription.updatedFields.chats
//       ) {
//         const updatedGroup = await Group.findOne({
//           groupId: change.documentKey._id,
//         }).populate("chats");
//         sendEventStreamData(updatedGroup);
//       }
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).end(JSON.stringify({ error: error.message }));
//   }
// }



// import Group from "@/models/group";
// import { connect } from "@/dbConfig/dbConfig";
// import { NextResponse } from "next/server";

// connect();

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const groupId = searchParams.get("groupId");
//     console.log(groupId);
//     const group = await Group.findOne({ groupId: groupId }).populate("chats");

//     const sendEventStreamData = (data) => {
//       return `data: ${JSON.stringify(data)}\n\n`;
//     };

//     const initialData = sendEventStreamData(group);

//     const changeStream = Group.watch();
//     changeStream.on("change", async (change) => {
//       if (
//         change.operationType === "update" &&
//         change.updateDescription.updatedFields.chats
//       ) {
//         const updatedGroup = await Group.findOne({
//           groupId: change.documentKey._id,
//         }).populate("chats");
//         const updatedData = sendEventStreamData(updatedGroup);
//         NextResponse.write(req, updatedData);
//       }
//     });

//     return NextResponse.eventStream(req, { data: initialData });
//   } catch (error) {
//     console.log(error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// import Group from "@/models/group";
// import { connect } from "@/dbConfig/dbConfig";
// import { NextResponse } from "next/server";

// connect();

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const groupId = searchParams.get("groupId");
//     console.log(groupId);
//     const group = await Group.findOne({ groupId: groupId }).populate("chats");

//     const sendEventStreamData = (data) => {
//       return NextResponse.event({
//         data: JSON.stringify(data),
//       });
//     };

//     sendEventStreamData(group);

//     const changeStream = Group.watch();
//     changeStream.on("change", async (change) => {
//       if (
//         change.operationType === "update" &&
//         change.updateDescription.updatedFields.chats
//       ) {
//         const updatedGroup = await Group.findOne({
//           groupId: change.documentKey._id,
//         }).populate("chats");
//         sendEventStreamData(updatedGroup);
//       }
//     });

//     return NextResponse.event();
//   } catch (error) {
//     console.log(error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


// import Group from "@/models/group";
// import { connect } from "@/dbConfig/dbConfig";
// import { NextResponse } from "next/server";

// connect();

// export async function GET(req, res) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const groupId = searchParams.get("groupId");
//     console.log(groupId);
//     const group = await Group.findOne({ groupId: groupId }).populate("chats");

//     const sendEventStreamData = (data) => {
//       res.write(`data: ${JSON.stringify(data)}\n\n`);
//     };

//     sendEventStreamData(group);

//     const changeStream = Group.watch();
//     changeStream.on("change", async (change) => {
//       if (
//         change.operationType === "update" &&
//         change.updateDescription.updatedFields.chats
//       ) {
//         const updatedGroup = await Group.findOne({
//           groupId: change.documentKey._id,
//         }).populate("chats");
//         sendEventStreamData(updatedGroup);
//       }
//     });

//     return NextResponse.event(res);
//   } catch (error) {
//     console.log(error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



import Group from "@/models/group";
import {connect} from  '@/dbConfig/dbConfig';
import { NextResponse } from "next/server";

connect();
export async function GET(req){
    try{
        const {searchParams} = new URL(req.url);
        const groupId = searchParams.get("groupId");
        // console.log(groupId);
        const resp = await Group.findOne({groupId:groupId}).populate('chats');
        return NextResponse.json({resp});
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
    
}