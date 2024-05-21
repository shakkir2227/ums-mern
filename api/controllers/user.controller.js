import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const test = (req, res) => {
    res.send(`Home`)
}

export const updateUser = async (req, res, next) => {


    // if user is not authenticated, throw error
    if (!req.user) return next(errorHandler(401, 'You need to Login!!'))

    const { user } = req;
    const { profilePicture } = req.body

    // if there is no profile picture, return
    if (!profilePicture) {
        return res.status(200).json({
            message: `Please select a profile picture before updating. 
        No picture was selected or sent to the server.`})
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user.id },
            { $set: { profilePicture } },
            { new: true }
        );
        const { password, ...userDetails } = updatedUser._doc;

        return res.status(200).json(userDetails)

    } catch (error) {
        console.log(error)
    }
}

export const getCurrentProfileData = async (req, res, next) => {

    const { id } = req.user;

    try {
        const user = await User.findOne({ _id: id })

        if (!user) {
          return  res.clearCookie("access_token").status(404).json({ error: "User not found!!!"})
        }

        const { password: hashedPassword, ...currentUser } = user._doc
        return res.status(200).json(currentUser)
    } catch (error) {
        next(errorHandler())
    }


}