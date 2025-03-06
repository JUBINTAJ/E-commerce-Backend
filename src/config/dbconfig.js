import mongoose from "mongoose"



const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log('db')
    }catch(error){
        console.log(error,'db connection')
    }
}

export default dbConnect