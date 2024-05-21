import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"


export const LoginAdmin = async (req, res, next) => {


    // Validate the email first, if error, wrong credentials
    // try a db call to get the user with this email and is an admin
    // if no such user, return You are not authorized
    // then check the password, if wrong password, send wrong credentials
    // Else, make jwt token with admin true and user id, put that in the cookie, 
    // and also send the user details removing password

    const { email, password } = req.body;

    if (!email?.trim()) return next(errorHandler(404, 'Invalid Credentials'))

    const admin = await User.findOne({ email, isAdmin: true })
    if (!admin) return next(errorHandler(404, 'Invalid credentials'))

    const validPassword = bcryptjs.compareSync(password, admin.password)
    if (!validPassword) return next(errorHandler(404, 'Invalid credentials'))

    const { password: hashedPassword, ...adminDetails } = admin._doc;

    const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET)
    const expiryDate = new Date((Date.now() + 3600000))

    res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(adminDetails)

}

export const viewUsersList = async (req, res, next) => {


    // Take all users except admin, take their username, email
    // profile pic and id. 
    try {
        const allUsers = await User.aggregate([
            {
                $match: {
                    isAdmin: false
                }
            },
            {
                $project: {
                    username: 1,
                    email: 1,
                    profilePicture: 1,

                }
            }
        ])


        return res.status(200).json(allUsers)
    } catch (error) {
        console.log(error)
        next(errorHandler(404, 'Internal server Error'))
    }

}

export const updateUser = async (req, res, next) => {

    const { id: userId } = req.params
    const { username, profilePicture } = req.body;

    if (username?.trim() === "") return next(errorHandler(400, `Oops! It seems there was an issue with your submission`))

    try {
        await User.updateOne({ _id: userId }, { $set: { username, profilePicture } })
        const updatedUser = await User.findOne({ _id: userId });
        const { password: hashedPassword, ...user } = updatedUser._doc
        return res.status(200).json(user);

    } catch (error) {
        next(errorHandler())
    }

}

export const deleteUser = async (req, res, next) => {
    const { id: userId } = req.params


    try {
        await User.deleteOne({ _id: userId })
        return res.status(200).json({ message: 'Deleted User successfully', id: userId })

    } catch (error) {
        console.log(error)
        next(errorHandler(500, error.message))
    }
}

export const createUser = async (req, res, next) => {
    const { email, username } = req.body
    if (email.trim() === "" || username.trim() === "") return next(errorHandler(400, "Bad Input"))

    const generatedPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

    try {
        await User.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(201).json({ message: "User created successfully" })

    } catch (err) {
        next(errorHandler(500, err.message))
    }
}