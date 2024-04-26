import mongoose from 'mongoose'

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.on("connected", (error) => {
            console.log('MongoDb connected')
            console.log(error)
        })
        connection.on("error", (error) => {
            console.log('MongoDB connection error')
            console.log(error)
            process.exit();
        })
    }
    catch(error){
        console.log("Something went wrong in connecting to db");
        console.log(error)
    }
}