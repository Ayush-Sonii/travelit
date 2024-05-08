import mongoose from 'mongoose';

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("Connected Succesfully");
        })

        connection.on('error',(e)=>{
            console.log("Error encountered "+e);
            process.exit;
        })
    }
    catch(e){
        console.log(e);
    }
}