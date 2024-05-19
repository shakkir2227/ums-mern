import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"


export const signup = async (req, res, next) => {

    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)

    try {
        await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(201).json({ message: "User created successfully" })

    } catch (err) {
        next(err)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found'))

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'))
        const { password: hashedPassword, ...user } = validUser._doc;

        const expiryDate = new Date(Date.now() + 3600000)
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(user)

    } catch (error) {

    }
}

export const google = async (req, res, next) => {
    console.log(req.body)
    try {
        const validUser = await User.findOne({ email: req.body.email })
        if (validUser) {
            jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            const { password: hashedPassword, ...user } = validUser._doc;
            const expiryDate = new Date(Date.now() + 3600000)

            res
                .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .json(user)

        } else {
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

            const generatedUsername = req.body.name.split(" ")
                .join("").toLowerCase() + (Math.floor(Math.random() * 10000)).toString()

            const newUser = await User.create({
                username: generatedUsername,
                email: req.body.email,
                profilePicture: req.body.photoURL,
                password: hashedPassword
            })

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const expiryDate = new Date(Date.now() + 3600000)

            const { password: hashedPassword2, ...user } = newUser

            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate
                })
                .status(200)
                .json(user)

        }
    } catch (error) {
        console.log(`User creation Error: ${error}`)
    }
}