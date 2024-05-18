import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config()

const app = express();

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then((connectionInstance) => {
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server listening on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(`Database connection error: ${err}`)
    })

import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || `Internal Server Error`
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode,
    })
})