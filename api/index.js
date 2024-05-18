import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log(`Database connected successfully`)
    app.listen(3000, () => {
        console.log(`server listening on port 3000`)
    })
})
.catch((err) => {
    console.log(`Database connnection error: ${err}`)
})

