import User from "../models/user.model.js"

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