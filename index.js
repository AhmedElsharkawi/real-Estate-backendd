import  express  from "express";
import mongoose from "mongoose"
import authroute from "./routes/auth.route.js"
import userroute from "./routes/user.route.js"
import listingroute from "./routes/listing.route.js"
import cors from "cors";

import dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config()


const app = express()


app.use(express.json())


  

app.use(cors({
  origin: true, 
  credentials: true,
}));

app.use(cookieParser())
app.use("/api/auth", authroute)
app.use("/api/users", userroute)
app.use("/api/listing", listingroute)




mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("Database has been connected")})
.catch((error)=>{
    console.log(error)

})

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}` )
})

