import express from "express" 

import dontenv from "dotenv"
import mongoose from "mongoose"

import authRoute from "./routes/auth.js"

import usersRoute from "./routes/users.js"

import hotelsRoute from "./routes/hotels.js"

import roomsRoute from "./routes/rooms.js"

import typesRoute from "./routes/types.js"

import cookieParser from "cookie-parser"

import cors from "cors"

const app = express()
dontenv.config()

const connect = async ()=> {
     try {
     //     await
           mongoose.connect(process.env.MONGO, { ignoreUndefined: true });
          console.log('Attempting mongoose.connect ...')
          
     } catch (error) {
          throw error;
     }

};

mongoose.set('strictQuery', true);

mongoose.connection.on("disconnected", ()=> {
     console.log("mongoDB disconnected")
})
mongoose.connection.on("connected", ()=>{
     console.log("mongoDB connected")
})

// app.get("/", (req, res)=> {
//      res.send('hello, first request')
//      // if you are sending an object, it's gonna be res.json(...)
// })

//middlewares   

// app.use((req, res, next)=> {
//      console.log("hi, im a middleware")
//      // res.send("Hello from middleware")
//      next()
// }) 
//OK, that was just a demo.

app.use(cors())
// but it's not important on the stage when we use the proxy
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/types", typesRoute)

//this thing works with routes that have next(err) in them (or just next- to pass the control...). error is passed into next and control comes here, in this case, for error handling.

app.use((err, req, res, next)=> {
     const errorStatus = err.status || 500
     const errorMessage = err.message || "some error"
     return res.status(errorStatus).json({
          success: false,
          status: errorStatus,
          message: errorMessage,
          stack: err.stack,
     })
})
 
app.listen(process.env.PORT || 8800, ()=>{
     connect()
     console.log("Express listening")
});





