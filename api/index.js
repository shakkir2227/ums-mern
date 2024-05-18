import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then((connectionInstance) => {
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`); 
    app.listen(process.env.PORT || 3000,  () => {
        console.log(`server listening on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(`Database connection error: ${err}`)
})

