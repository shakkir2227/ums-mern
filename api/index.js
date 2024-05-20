import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path"

dotenv.config()

const app = express();

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

app.use(express.json())
app.use(cookieParser())

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