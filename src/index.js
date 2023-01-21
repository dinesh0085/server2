const express=require('express')
const cors=require("cors")
const connect=require("./database/dbConnect")
require("dotenv").config()
const PORT=process.env.PORT;
const userRouter=require("./routes/user.route")

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
 return res.send('Welcome To Server Of ----')
})
app.use("/user",userRouter)


app.listen(PORT,async()=>{
    try{
        await connect()
        console.log("Database connected");
    }catch(e){
        console.log("Error");
    } 
    console.log(`Listening Server to Port number ${PORT}`)})