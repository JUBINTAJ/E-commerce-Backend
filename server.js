import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import errorHandler from './src/middlewares/errorHandler.js';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js'
dotenv.config()
const app=express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(errorHandler)


app.use('/api/user',userRoutes)


const DB_URL=process.env.DB_URL;
const port=process.env.PORT || 5000

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB_URL);
console.log(`connected to mongodb`)
}


app.get('/',(req,res)=>{
    res.send("llooii")
})


app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})



