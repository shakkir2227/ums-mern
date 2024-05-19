import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://imgs.search.brave.com/d13gMNyry1MbXWRGgBid_XwL8WolAayNSKGHd4WtlKw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzE4LzAzLzM1/LzM2MF9GXzExODAz/MzUwNl91TXJobnJq/QldCeFZFOXNZR1Rn/Qmh0OFM1bGlWbkll/WS5qcGc"
    },
}, { timestamps: true })

const User = model("User", userSchema)
export default User