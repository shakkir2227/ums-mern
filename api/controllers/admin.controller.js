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

    if (!email.trim()) return next(errorHandler(404, 'Invalid Credentials'))

    const admin = await User.findOne({ email, isAdmin: true })
    if (!admin) return next(errorHandler(404, 'Invalid credentials'))

    const validPassword = bcryptjs.compareSync(password, admin.password)
    if (!validPassword) return next(errorHandler(404, 'Invalid credentials'))

    const { password: hashedPassword, ...adminDetails } = admin._doc;

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET)
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
        next(errorHandler(404, 'Internal server Error'))
    }

}